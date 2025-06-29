package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Devolucao;
import voce.aluga.repository.DevolucaoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DevolucaoService {

    @Autowired
    private DevolucaoRepository devolucaoRepository;

    public Devolucao salvar(Devolucao devolucao) {
        return devolucaoRepository.save(devolucao);
    }

    public List<Devolucao> listarTodas() {
        return devolucaoRepository.findAll();
    }

    public Optional<Devolucao> buscarPorId(int id) {
        return devolucaoRepository.findById(id);
    }

    public void deletar(int id) {
        devolucaoRepository.deleteById(id);
    }

    public String verificarAvarias(int id) {
        return devolucaoRepository.findById(id)
                .map(Devolucao::verificarAvarias)
                .orElse("Registro de devolução não encontrado.");
    }
}
