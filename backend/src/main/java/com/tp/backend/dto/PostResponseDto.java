package com.tp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDto {
    private Long id;
    private String postName;
    private String description;
    private String name;
    private String username;
    private String category;
    private String subcategory;
    private LocalDateTime createdAt;
    private Long commentCount;
    private Long likes;
    private Long dislikes;
    private Long hearts;
}
