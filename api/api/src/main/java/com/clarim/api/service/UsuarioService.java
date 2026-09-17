package com.clarim.api.service;

import com.clarim.api.dto.UsuarioCadastro;
import com.clarim.api.model.Papel;
import com.clarim.api.model.Provider;
import com.clarim.api.model.Usuario;
import com.clarim.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void cadastrar(UsuarioCadastro usuarioCadastro){
        if(usuarioRepository.existsByEmail(usuarioCadastro.email())) {
            throw new IllegalArgumentException();
        }

        Usuario usuario = new Usuario();
        usuario.setNome(usuarioCadastro.nome());
        usuario.setEmail(usuarioCadastro.email());

        usuario.setSenhaHash(passwordEncoder.encode(usuarioCadastro.senha()));
        usuario.setPapel(Papel.LEITOR);
        usuario.setProvider(Provider.LOCAL);

        usuarioRepository.save(usuario);
    }

}
