package voce.aluga.service;

import voce.aluga.model.Usuario;
import voce.aluga.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario login(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario autenticar(Usuario usuario) {
        Usuario existente = usuarioRepository.findByEmail(usuario.getEmail());
        if (existente != null && existente.getNome().equals(usuario.getNome())) {
            return existente;
        }
        return null;
    }
}
