package com.clarim.api.dto;

import jakarta.validation.constraints.*;
import java.util.Set;

public record NoticiaRequest (
        @NotBlank
        @Size(min = 10, max = 100)
        String titulo,

        @NotBlank
        @Size(min = 10, max = 100)
        String slug,

        String resumo,

        String texto,

        boolean premium,

        @Positive(message = "o Id da categoria deve ser positivo")
        Long categoriaId,

        @Positive
        Long autorId,

        Set<String> tags
){}
