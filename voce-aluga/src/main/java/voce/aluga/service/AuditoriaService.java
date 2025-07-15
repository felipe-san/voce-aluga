package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Auditoria;
import voce.aluga.repository.AuditoriaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AuditoriaService {

    @Autowired
    private AuditoriaRepository auditoriaRepository;

    public Auditoria salvar(Auditoria auditoria) {
        return auditoriaRepository.save(auditoria);
    }

    public List<Auditoria> listarTodas() {
        return auditoriaRepository.findAll();
    }

    public Optional<Auditoria> buscarPorId(int id) {
        return auditoriaRepository.findById(id);
    }

    public void deletar(int id) {
        auditoriaRepository.deleteById(id);
    }
}
