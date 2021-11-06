package com.tp.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BlogCategoryDto {
    private Long id;
    private String name;
    private String description;
    private Integer numberOfPosts;

}
