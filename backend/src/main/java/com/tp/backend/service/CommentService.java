package com.tp.backend.service;

import com.tp.backend.dto.CommentRequestDto;
import com.tp.backend.dto.CommentResponseDto;
import com.tp.backend.exception.BackendException;
import com.tp.backend.mapper.CommentMapper;
import com.tp.backend.model.Comment;
import com.tp.backend.model.NotificationEmail;
import com.tp.backend.model.Post;
import com.tp.backend.model.User;
import com.tp.backend.repository.CommentRepository;
import com.tp.backend.repository.PostRepository;
import com.tp.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommentService {
    @Value("${backend.client.url}")
    private String clientUrl;

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

    public CommentService(PostRepository postRepository, UserRepository userRepository, AuthService authService, CommentMapper commentMapper, CommentRepository commentRepository, MailContentBuilder mailContentBuilder, MailService mailService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.authService = authService;
        this.commentMapper = commentMapper;
        this.commentRepository = commentRepository;
        this.mailContentBuilder = mailContentBuilder;
        this.mailService = mailService;
    }

    @Transactional()
    public void save(CommentRequestDto commentRequestDto) {
        Post post = postRepository.findById(commentRequestDto.getPostId())
                .orElseThrow(() -> new BackendException("Post not found"));
        User user = authService.getCurrentUser();
        Comment comment = commentMapper.mapToModel(commentRequestDto, post, user);
        post.addComment(comment);
        postRepository.save(post);
        String url = clientUrl + "post/" + post.getId() + "/" + comment.getId();
        String btnName = "View";
        String text = user.getName() +"("+user.getUsername()+ ") just commented on your post - "+ post.getPostName()+".\nClick on the button below to view details";
        String msg = mailContentBuilder.build(text, url, btnName);
        String subject = "Your post got one comment from "+user.getName();
        String recipient = post.getUser().getEmail();
        String successResponse = "Comment notification email sent.";
        mailService.sendMail(new NotificationEmail(subject, recipient, msg, successResponse));
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsForPost(Long postId){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BackendException("Post not found"));
        return commentRepository.findByPost(post)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByUser(String userName){
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new BackendException("User not found."));
        return commentRepository.findByUser(user)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(Collectors.toList());
    }
}
