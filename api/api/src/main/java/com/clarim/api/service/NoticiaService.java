package com.clarim.api.service;

import com.clarim.api.dto.NoticiaResumo;
import com.clarim.api.model.Noticia;
import com.clarim.api.repository.NoticiaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepository;

    public NoticiaService(NoticiaRepository noticiaRepository) {
        this.noticiaRepository = noticiaRepository;
    }

    public List<NoticiaResumo> listarTodas() {
        return noticiaRepository.findAll()
                .stream()
                .map(this::paraDto)
                .toList();
    }

    private NoticiaResumo paraDto(Noticia noticia) {
        return new NoticiaResumo(noticia.getId(),
                noticia.getTitulo(),
                noticia.getSlug(),
                noticia.getResumo(),
                noticia.getCategoria().getNome(),
                noticia.getTexto(),
                noticia.getPremium(),
                noticia.getPublicadaEm()
        );
    }

    public Optional<NoticiaResumo> buscarPorId(Long id) {
        return listarTodas().stream()
                .filter(noticia -> noticia.id().equals(id))
                .findFirst();
    }
}
