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
        Categoria categoria = categoriaRepository.findById(req.categoriaId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        Usuario autor = usuarioRepository.findById(req.autorId()).orElseThrow();

        if(autor.getPapel() == Papel.LEITOR) {
            throw new IllegalArgumentException("Usuário não tem permissão para criar notícias");
        }

        Noticia noticia = new Noticia();
        noticia.setTitulo(req.titulo());
        noticia.setSlug(req.slug());
        noticia.setResumo(req.resumo());
        noticia.setTexto(req.texto());
        noticia.setPremium(req.premium());
        noticia.setCategoria(categoria);
        noticia.setUsuario(autor);

        Noticia salva = noticiaRepository.save(noticia);
        return new NoticiaResponse(salva.getId(), noticia.getTitulo(), noticia.getSlug(), noticia.getResumo(), noticia.getTexto(), noticia.getCategoria().getNome(), noticia.getUsuario().getNome(), noticia.getPremium(), noticia.getPublicadaEm());
    }
}
