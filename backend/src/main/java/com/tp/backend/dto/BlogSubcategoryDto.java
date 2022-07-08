package com.tp.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BlogSubcategoryDto {
    private Long id;
    private String name;
    private String description;
    private Long categoryId;
    private Integer numberOfPosts;
}
