package voce.aluga.service;
import voce.aluga.model.Administrador;
import voce.aluga.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    public Administrador salvar(Administrador admin) {
        return administradorRepository.save(admin);
    }

    public List<Administrador> listarTodos() {
        return administradorRepository.findAll();
    }

    public Optional<Administrador> buscarPorId(int id) {
        return administradorRepository.findById(id);
    }

    public void deletar(int id) {
        administradorRepository.deleteById(id);
    }
}