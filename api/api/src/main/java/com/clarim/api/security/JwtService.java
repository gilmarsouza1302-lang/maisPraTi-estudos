//package com.clarim.api.security;
//
//import com.clarim.api.model.Usuario;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.SecretKey;
//import java.util.Date;
//
//@Component
//public class JwtService {
//    @Value("${jwt.secret}")
//    private String jwtSecret;
//
//    @Value("${jwt.expiracao-minutos}")
//    private Long jwtExpiracaoMinutos;
//
//    public String gerarToken(Usuario usuario) {
//        Date agora = new Date();
//        Date expiraEm = new Date(agora.getTime() + jwtExpiracaoMinutos * 60 * 1000);
//
//        private SecretKey chave() {
//            return Keys.hmacShaKeyFor(jwtSecret.getBytes());
//        }
//
//        return Jwts.builder()
//                .subject(usuario.getEmail())
//                .claim("nome", usuario.getNome())
//                .claim("papel", usuario.getPapel().name())
//                .claim("userId", usuario.getId())
//                .issuedAt(agora)
//                .expiration(expiraEm)
//                .signWith(chave())
//                .compact();
//    }
//}
