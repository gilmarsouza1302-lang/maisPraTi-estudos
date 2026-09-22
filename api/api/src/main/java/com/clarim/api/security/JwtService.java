package com.clarim.api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

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

    public String extrairEmail(String token) {
        return extrairClaim(token, Claims::getSubject);
    }

    public boolean tokenValido(String token, String emailEsperado) {
        String email = extrairEmail(token);
        return email.equals(emailEsperado) && !tokenExpirado(token);
    }

    private boolean tokenExpirado(String token) {
        Date expiraEm = extrairClaim(token, Claims::getExpiration);
        return expiraEm.before(new Date());
    }

    private <T> T extrairClaim(String token, Function<Claims, T> resolvedor) {
        Claims claims = Jwts.parser()
                .verifyWith(chaveSecreta())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return resolvedor.apply(claims);
    }
}
