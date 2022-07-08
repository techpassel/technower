package com.tp.backend.repository;

import com.tp.backend.model.Category;
import com.tp.backend.model.Post;
import com.tp.backend.model.Subcategory;
import com.tp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByCategory(Category category);

    List<Post> findAllBySubcategory(Subcategory subcategory);

    List<Post> findByUser(User user);
}
