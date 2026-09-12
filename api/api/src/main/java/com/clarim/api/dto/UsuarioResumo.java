package com.clarim.api.dto;

import com.clarim.api.model.Papel;

public record UsuarioResumo(
        Long id,
        String nome,
        String email,
        Papel papel,
        String avatarUrl
) {}
