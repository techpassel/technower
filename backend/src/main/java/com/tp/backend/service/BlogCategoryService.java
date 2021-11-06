package com.tp.backend.service;

import com.tp.backend.dto.BlogCategoryDto;
import com.tp.backend.exception.BackendException;
import com.tp.backend.mapper.BlogCategoryMapper;
import com.tp.backend.model.Category;
import com.tp.backend.repository.CategoryRepository;
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
    private final BlogCategoryMapper blogCategoryMapper;

    @Transactional
    // @Transactional annotation is important while working with relational database to avoid consistency problems
    public BlogCategoryDto save(BlogCategoryDto blogCategoryDto){
        Category save = categoryRepository.save(blogCategoryMapper.mapDtoToCategory(blogCategoryDto));
        blogCategoryDto.setId(save.getId());
        blogCategoryDto.setNumberOfPosts(save.getPosts() != null ?save.getPosts().size():0);
        return blogCategoryDto;
    }

    @Transactional(readOnly = true)
    public List<BlogCategoryDto> getAllCategories(){
        return categoryRepository.findAll()
                .stream()
                .map(blogCategoryMapper::mapCategoryToDto)
                .collect(Collectors.toList());
    }

    public BlogCategoryDto getCategory(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BackendException("No category count with given Id."));
        return blogCategoryMapper.mapCategoryToDto(category);
    }

}
