package com.tp.backend.service;

import com.tp.backend.dto.CommentVoteDto;
import com.tp.backend.dto.PostVoteDto;
import com.tp.backend.exception.BackendException;
import com.tp.backend.model.Comment;
import com.tp.backend.model.Post;
import com.tp.backend.model.User;
import com.tp.backend.model.Vote;
import com.tp.backend.repository.CommentRepository;
import com.tp.backend.repository.PostRepository;
import com.tp.backend.repository.UserRepository;
import com.tp.backend.repository.VoteRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class VoteService {
    private final VoteRepository voteRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final AuthService authService;

    @Transactional
    public void votePost(PostVoteDto postVoteDto){
        Post post = postRepository.getById(postVoteDto.getPostId());
        User user = authService.getCurrentUser();
        Optional<Vote> optVote = post.getVotes().stream().filter(v -> v.getUser() == user).findAny();
        if(optVote.isPresent()){
            post.getVotes().forEach(v -> {if(v.getUser() == user) v.setVoteType(postVoteDto.getVoteType());});
        } else {
            post.addVote(new Vote(postVoteDto.getVoteType(), user));
        }
        postRepository.save(post);
    }

    @Transactional
    public void voteComment(CommentVoteDto commentVoteDto){
        // Post post = postRepository.getById(commentVoteDto.getPostId());
        User user = authService.getCurrentUser();
        Comment comment = commentRepository.getById(commentVoteDto.getCommentId());
        Optional<Vote> optVote = comment.getVotes().stream().filter(v -> v.getUser() == user).findAny();
        if(optVote.isPresent()){
            comment.getVotes().forEach(v -> {if(v.getUser() == user) v.setVoteType(commentVoteDto.getVoteType());});
        } else {
            comment.addVote(new Vote(commentVoteDto.getVoteType(), user));
        }
        commentRepository.save(comment);
    }
}
