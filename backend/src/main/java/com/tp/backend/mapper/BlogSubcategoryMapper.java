package com.tp.backend.mapper;

import com.tp.backend.dto.BlogCategoryDto;
import com.tp.backend.dto.BlogSubcategoryDto;
import com.tp.backend.model.Category;
import com.tp.backend.model.Post;
import com.tp.backend.model.Subcategory;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class BlogSubcategoryMapper {
    @Mapping(target = "numberOfPosts", expression = "java(countPosts(subcategory.getPosts()))")
    public abstract BlogSubcategoryDto mapSubcategoryToDto(Subcategory subcategory);

    // Used in above method "mapCategoryToDto"
    Integer countPosts(List<Post> posts){ return posts.size();}

    @InheritInverseConfiguration
    @Mapping(target = "posts", ignore = true)
    @Mapping(target = "category", source = "category")
    @Mapping(target = "id", source = "blogSubcategoryDto.id")
    @Mapping(target = "name", source = "blogSubcategoryDto.name")
    @Mapping(target = "description", source = "blogSubcategoryDto.description")
    public abstract Subcategory mapDtoToSubcategory(BlogSubcategoryDto blogSubcategoryDto, Category category);
}
