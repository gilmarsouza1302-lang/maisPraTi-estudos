package com.clarim.api.controller;

import com.clarim.api.dto.NoticiaRequest;
import com.clarim.api.dto.NoticiaResponse;
import com.clarim.api.dto.NoticiaResumo;
import com.clarim.api.service.NoticiaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    @GetMapping
    public List<NoticiaResumo> listar() {
        return noticiaService.listarTodas();
    }

    @GetMapping("/{id}")
    public NoticiaResumo buscarPorId(@PathVariable Long id) {
        return noticiaService.buscarPorId(id).orElse(null);
    }

    @PostMapping("/criar")
    public ResponseEntity<NoticiaResponse> criar(@RequestBody @Valid NoticiaRequest noticia) {
        NoticiaResponse criada = noticiaService.criar(noticia);
        return ResponseEntity.ok(criada);
    }
}