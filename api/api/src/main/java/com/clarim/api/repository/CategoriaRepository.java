package com.clarim.api.repository;

import com.clarim.api.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    @Override
    Optional<Categoria> findById(Long id);
}
