package com.clarim.api.model;

import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "noticia")
public class Noticia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String titulo;

    @Column(nullable = false, length = 220)
    private String slug;

    @Column(length = 400)
    private String resumo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;

    @Column(nullable = false)
    private Boolean premium;

    private OffsetDateTime publicadaEm;

    @Column(insertable = false, updatable = false)
    private OffsetDateTime criadaEm;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "autor_id", nullable = false)
    private Usuario usuario;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "noticia_tag",
            joinColumns = @JoinColumn(name = "noticia_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    public Noticia() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Boolean getPremium() {
        return premium;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public OffsetDateTime getPublicadaEm() {
        return publicadaEm;
    }

    public void setPublicadaEm(OffsetDateTime publicadaEm) {
        this.publicadaEm = publicadaEm;
    }

    public OffsetDateTime getCriadaEm() {
        return criadaEm;
    }

    public void setCriadaEm(OffsetDateTime criadaEm) {
        this.criadaEm = criadaEm;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void adicionarTag(Tag tag) {
        this.tags.add(tag);
        tag.getNoticias().add(this);
    }

    public void removerTag(Tag tag) {
        this.tags.remove(tag);
        tag.getNoticias().remove(this);
    }
}
