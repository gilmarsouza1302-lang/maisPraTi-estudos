package com.clarim.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "plano")
public class Plano {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String nome;

    @Column(name = "preco_centavos", nullable = false)
    private Long precoCentavos;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Intervalo intervalo;

    @Column(name = "stripe_price_id", nullable = false, unique = true, length = 60)
    private String stripePriceId;

    @Column(nullable = false)
    private boolean ativo = true;

    public Plano() {}

    public String getPrecoFormatado() {
        return String.format("R$ %d,%02d", precoCentavos / 100, precoCentavos % 100);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getPrecoCentavos() {
        return precoCentavos;
    }

    public void setPrecoCentavos(Long precoCentavos) {
        this.precoCentavos = precoCentavos;
    }

    public Intervalo getIntervalo() {
        return intervalo;
    }

    public void setIntervalo(Intervalo intervalo) {
        this.intervalo = intervalo;
    }

    public String getStripePriceId() {
        return stripePriceId;
    }

    public void setStripePriceId(String stripePriceId) {
        this.stripePriceId = stripePriceId;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
