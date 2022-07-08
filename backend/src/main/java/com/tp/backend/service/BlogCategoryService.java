package com.tp.backend.service;

import com.tp.backend.dto.BlogCategoryDto;
import com.tp.backend.dto.BlogSubcategoryDto;
import com.tp.backend.exception.BackendException;
import com.tp.backend.mapper.BlogCategoryMapper;
import com.tp.backend.mapper.BlogSubcategoryMapper;
import com.tp.backend.model.Category;
import com.tp.backend.model.Subcategory;
import com.tp.backend.repository.CategoryRepository;
import com.tp.backend.repository.SubcategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class BlogCategoryService {
    private final CategoryRepository categoryRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final BlogCategoryMapper blogCategoryMapper;
    private final BlogSubcategoryMapper blogSubcategoryMapper;

    @Transactional
    // @Transactional annotation is important while working with relational database to avoid consistency problems
    public BlogCategoryDto createCategory(BlogCategoryDto blogCategoryDto){
        Category save = categoryRepository.save(blogCategoryMapper.mapDtoToCategory(blogCategoryDto));
        blogCategoryDto.setId(save.getId());
        blogCategoryDto.setNumberOfPosts(save.getPosts() != null ? save.getPosts().size() : 0);
        return blogCategoryDto;
    }

    @Transactional(readOnly = true)
    public List<BlogCategoryDto> getAllCategories(){
        return categoryRepository.findAll()
                .stream()
                .map(blogCategoryMapper::mapCategoryToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BlogCategoryDto getCategory(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BackendException("No category count with given Id."));
        return blogCategoryMapper.mapCategoryToDto(category);
    }

    @Transactional
    public BlogSubcategoryDto createSubcategory(BlogSubcategoryDto blogSubcategoryDto){
        Category category = categoryRepository.findById(blogSubcategoryDto.getCategoryId())
                .orElseThrow(() -> new BackendException("Category not found."));
        Subcategory save = subcategoryRepository.save(blogSubcategoryMapper.mapDtoToSubcategory(blogSubcategoryDto, category));
        blogSubcategoryDto.setId(save.getId());
        blogSubcategoryDto.setNumberOfPosts(save.getPosts() != null ? save.getPosts().size() : 0);
        return blogSubcategoryDto;
    }

    @Transactional(readOnly = true)
    public List<BlogSubcategoryDto> getSubCategoriesByCategoryId(Long id){
        Category category = categoryRepository.findById(id).orElseThrow
                (() -> new BackendException("Category not found."));
        return subcategoryRepository.findAllByCategory(category).stream().map
                (blogSubcategoryMapper::mapSubcategoryToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BlogSubcategoryDto getSubcategory(Long id){
        Subcategory subcategory = subcategoryRepository.findById(id).orElseThrow
                (() -> new BackendException("Subcategory not found"));
        return blogSubcategoryMapper.mapSubcategoryToDto(subcategory);
    }
}
