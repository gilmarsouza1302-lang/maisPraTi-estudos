package com.clarim.api.controller;

import com.clarim.api.dto.UsuarioCadastro;
import com.clarim.api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<Void> cadastrar (@RequestBody @Valid UsuarioCadastro usuarioCadastro){
        usuarioService.cadastrar(usuarioCadastro);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
