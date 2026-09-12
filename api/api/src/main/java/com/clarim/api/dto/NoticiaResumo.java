package com.clarim.api.dto;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

public record NoticiaResumo(
        Long id,
        String titulo,
        String slug,
        String resumo,
        String categoria,
        String texto,
        boolean premium,
        OffsetDateTime publicadaEm
) {}
