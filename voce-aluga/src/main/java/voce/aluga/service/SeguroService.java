package voce.aluga.service;

import voce.aluga.model.Seguro;
import voce.aluga.repository.SeguroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeguroService {

    @Autowired
    private SeguroRepository repository;

    public List<Seguro> listarTodos() {
        return repository.findAll();
    }

    public Optional<Seguro> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Seguro criar(Seguro seguro) {
        seguro.calcularSeguro();
        seguro.validarSeguro();
        return repository.save(seguro);
    }

    public Seguro atualizar(Integer id, Seguro novo) {
        return repository.findById(id).map(s -> {
            s.setTipoSeguro(novo.getTipoSeguro());
            s.setCobertura(novo.getCobertura());
            s.setDescricao(novo.getDescricao());
            s.calcularSeguro();
            s.validarSeguro();
            return repository.save(s);
        }).orElseThrow(() -> new RuntimeException("Seguro não encontrado"));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
