package com.tp.backend.repository;

import com.tp.backend.model.Category;
import com.tp.backend.model.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
    List<Subcategory> findAllByCategory(Category category);
}
