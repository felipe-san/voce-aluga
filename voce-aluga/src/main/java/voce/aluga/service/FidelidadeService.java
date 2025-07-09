package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Fidelidade;
import voce.aluga.repository.FidelidadeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FidelidadeService {

    @Autowired
    private FidelidadeRepository fidelidadeRepository;

    public Fidelidade salvar(Fidelidade fidelidade) {
        return fidelidadeRepository.save(fidelidade);
    }

    public List<Fidelidade> listarTodas() {
        return fidelidadeRepository.findAll();
    }

    public Optional<Fidelidade> buscarPorId(int id) {
        return fidelidadeRepository.findById(id);
    }

    public void deletar(int id) {
        fidelidadeRepository.deleteById(id);
    }
}
