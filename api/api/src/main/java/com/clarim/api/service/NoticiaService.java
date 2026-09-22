package com.clarim.api.service;

import com.clarim.api.dto.NoticiaRequest;
import com.clarim.api.dto.NoticiaResponse;
import com.clarim.api.dto.NoticiaResumo;
import com.clarim.api.model.Categoria;
import com.clarim.api.model.Noticia;
import com.clarim.api.model.Papel;
import com.clarim.api.model.Usuario;
import com.clarim.api.repository.CategoriaRepository;
import com.clarim.api.repository.NoticiaRepository;
import com.clarim.api.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepository;
    private final CategoriaRepository categoriaRepository;
    private final UsuarioRepository usuarioRepository;

    public NoticiaService(NoticiaRepository noticiaRepository, CategoriaRepository categoriaRepository, UsuarioRepository usuarioRepository) {
        this.noticiaRepository = noticiaRepository;
        this.categoriaRepository = categoriaRepository;
        this.usuarioRepository = usuarioRepository;
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

    public NoticiaResponse criar(NoticiaRequest req) {
        Categoria categoria = categoriaRepository.findById(req.getCategoriaId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        Usuario autor = usuarioRepository.findById(req.getAutorId()).orElseThrow();

        if(autor.getPapel() == Papel.LEITOR) {
            throw new IllegalArgumentException("Usuário não tem permissão para criar notícias");
        }

        Noticia noticia = new Noticia(req.getTitulo(), req.getSlug(), req.getResumo(), categoria, req.getTexto(), req.getPremium(), autor);
        Noticia salva = noticiaRepository.save(noticia);
        return new NoticiaResponse(noticia.getId(), noticia.getTitulo(), noticia.getSlug(), noticia.getResumo(), noticia.getCategoria().getNome(), noticia.getTexto(), noticia.getPremium(), noticia.getPublicadaEm());
    }
}
