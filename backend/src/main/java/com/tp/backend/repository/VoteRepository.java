package com.tp.backend.repository;

import com.tp.backend.model.Comment;
import com.tp.backend.model.Post;
import com.tp.backend.model.User;
import com.tp.backend.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Vote> findAllByPost(Post post);

    // Before adding a new vote we must run this query so that if a user have voted earlier also same thing then
    // This time his vote will be deleted and if the user have voted opposite thing then his previous vote
    // will be removed and new vote will be added
    @Query("SELECT v FROM Vote v WHERE v.post = ?1 and v.user = ?2")
    Optional<Vote> findByPostAndUser(Post post, User user);

    // @Query("SELECT v FROM Vote v WHERE v.comment = ?1 and v.user = ?2")
    // Optional<Vote> findByCommentAndUser(Comment post, User user);
}
