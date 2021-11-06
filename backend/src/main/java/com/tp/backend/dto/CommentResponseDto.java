package com.tp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {
    private Long id;
    private Long postId;
    private String text;
    private LocalDateTime createdAt;
    private String username;
    private String userActualName;
    private Long likes;
    private Long dislikes;
    private Long hearts;
}
