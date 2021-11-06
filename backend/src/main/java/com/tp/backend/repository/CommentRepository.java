package com.tp.backend.repository;

import com.tp.backend.model.Comment;
import com.tp.backend.model.Post;
import com.tp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
    List<Comment> findByUser(User user);
}
