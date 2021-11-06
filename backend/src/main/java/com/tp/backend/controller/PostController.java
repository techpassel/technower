package com.tp.backend.controller;

import com.tp.backend.dto.PostRequestDto;
import com.tp.backend.dto.PostResponseDto;
import com.tp.backend.service.PostService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@AllArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<Void> createPost(@RequestBody PostRequestDto postRequest){
        postService.save(postRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostByID(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(postService.getPost(id));
    }

    @GetMapping("/by-category/{id}")
    public ResponseEntity<List<PostResponseDto>> getPostsByCategory(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getPostsByCategory(id));
    }

    @GetMapping("by-user/{userName}")
    public ResponseEntity<List<PostResponseDto>> getPostsByUsername(@PathVariable String userName) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getPostsByUsername(userName));
    }
}
