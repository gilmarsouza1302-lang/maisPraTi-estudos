package com.clarim.api.dto;

import java.time.OffsetDateTime;
import java.util.Set;

public record NoticiaResponse(
        Long id,
        String titulo,
        String slug,
        String resumo,
        String texto,
        String categoria,
        String autor,
        boolean premium,
        OffsetDateTime publicadaEm,
        Set<String> tags
) {
}
