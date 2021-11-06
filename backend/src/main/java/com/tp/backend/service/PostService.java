package com.tp.backend.service;

import com.tp.backend.dto.PostRequestDto;
import com.tp.backend.dto.PostResponseDto;
import com.tp.backend.exception.BackendException;
import com.tp.backend.mapper.PostMapper;
import com.tp.backend.model.Category;
import com.tp.backend.model.Post;
import com.tp.backend.model.User;
import com.tp.backend.repository.CategoryRepository;
import com.tp.backend.repository.PostRepository;
import com.tp.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final PostMapper postMapper;

    @Transactional
    public void save(PostRequestDto postRequestDto){
        Category category = categoryRepository.findById(postRequestDto.getCategoryId())
                .orElseThrow(() -> new BackendException("Category not found exception : "
                        +postRequestDto.getCategoryId()));
        User user = authService.getCurrentUser();
        postRepository.save(postMapper.mapToModel(postRequestDto, category, user));
    }

    @Transactional(readOnly = true)
    public PostResponseDto getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new BackendException("Blog not found with id : "+id));
        return postMapper.mapToDto(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> getAllPosts() {
        List<Post> posts=postRepository.findAll();
        return postRepository.findAll()
                .stream()
                .map(postMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> getPostsByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new BackendException("Category not found exception : "+categoryId));
        List<Post> posts = postRepository.findAllByCategory(category);
        return posts.stream().map(postMapper::mapToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> getPostsByUsername(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));
        return postRepository.findByUser(user)
                .stream()
                .map(postMapper::mapToDto)
                .collect(Collectors.toList());
    }

}
