package com.tp.backend.mapper;

import com.tp.backend.dto.BlogCategoryDto;
import com.tp.backend.model.Category;
import com.tp.backend.model.Post;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class BlogCategoryMapper {
    @Mapping(target = "numberOfPosts", expression = "java(countPosts(category.getPosts()))")
    public abstract BlogCategoryDto mapCategoryToDto(Category category);

    // Used in above method "mapCategoryToDto"
    Integer countPosts(List<Post> posts){ return posts.size();}

    @InheritInverseConfiguration
    @Mapping(target = "posts", ignore = true)
    public abstract Category mapDtoToCategory(BlogCategoryDto blogCategoryDto);
}
