package com.tp.backend.controller;

import com.tp.backend.dto.BlogCategoryDto;
import com.tp.backend.dto.BlogSubcategoryDto;
import com.tp.backend.service.BlogCategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog-category")
@AllArgsConstructor
@Slf4j
public class BlogCategoryController {

    private BlogCategoryService blogCategoryService;

    @PostMapping()
    public ResponseEntity<BlogCategoryDto> createBlogCategory(@RequestBody BlogCategoryDto blogCategory){
        BlogCategoryDto blogCategoryDto = blogCategoryService.createCategory(blogCategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(blogCategoryDto);
    }

    @GetMapping()
    public ResponseEntity<List<BlogCategoryDto>> getAllBlogCategories(){
        List<BlogCategoryDto> blogCategoryDtoList = blogCategoryService.getAllCategories();
        return ResponseEntity.status(HttpStatus.OK).body(blogCategoryDtoList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<BlogCategoryDto> getCategoryDetails(@PathVariable Long id){
        BlogCategoryDto category = blogCategoryService.getCategory(id);
        return ResponseEntity.status(HttpStatus.OK).body(category);
    }

    @PostMapping("/subcategory")
    public ResponseEntity<BlogSubcategoryDto> createBlogSubcategory(@RequestBody BlogSubcategoryDto blogSubcategory){
        BlogSubcategoryDto blogSubcategoryDto = blogCategoryService.createSubcategory(blogSubcategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(blogSubcategoryDto);
    }

    @GetMapping("/subcategory/by-category/{categoryId}")
    public ResponseEntity<List<BlogSubcategoryDto>> getBlogSubcategoriesByCategoryId(@PathVariable Long categoryId){
        List<BlogSubcategoryDto> blogSubcategoryDtoList = blogCategoryService.getSubCategoriesByCategoryId(categoryId);
        return ResponseEntity.status(HttpStatus.OK).body(blogSubcategoryDtoList);
    }

    @GetMapping(value = "/subcategory/{id}")
    public ResponseEntity<BlogSubcategoryDto> getSubcategoryDetails(@PathVariable Long id){
        BlogSubcategoryDto subCategory = blogCategoryService.getSubcategory(id);
        return ResponseEntity.status(HttpStatus.OK).body(subCategory);
    }
}

