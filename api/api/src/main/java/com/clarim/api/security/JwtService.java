package com.clarim.api.security;

import com.clarim.api.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtService {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiracao-minutos}")
    private Long jwtExpiracaoMinutos;

    private SecretKey chaveSecreta() {
        byte[] bytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(bytes);
    }

    public String gerarToken(UsuarioAutenticado usuario) {
        Date agora = new Date();
        Date expiraEm = new Date(agora.getTime() + jwtExpiracaoMinutos * 60 * 1000);

        return Jwts.builder()
                .subject(usuario.getUsername())
                .claim("papel", usuario.getUsuario().getPapel().name())
                .claim("nome", usuario.getUsuario().getNome())
                .issuedAt(agora)
                .expiration(expiraEm)
                .signWith(chaveSecreta())
                .compact();
    }
}
