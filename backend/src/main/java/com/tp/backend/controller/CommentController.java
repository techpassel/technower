package com.tp.backend.controller;

import com.tp.backend.dto.CommentRequestDto;
import com.tp.backend.dto.CommentResponseDto;
import com.tp.backend.service.CommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController()
@RequestMapping("/api/comment")
@Slf4j
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody CommentRequestDto commentRequestDto){
        commentService.save(commentRequestDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/by-post/{postId}")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByPost(@PathVariable Long postId){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getCommentsForPost(postId));
    }

    @GetMapping("/by-user/{userName}")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByUser(@PathVariable String userName){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getCommentsByUser(userName));
    }
}
