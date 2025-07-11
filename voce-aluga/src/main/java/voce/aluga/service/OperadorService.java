package voce.aluga.service;

import voce.aluga.model.Operador;
import voce.aluga.repository.OperadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OperadorService {

    @Autowired
    private OperadorRepository operadorRepository;

    public List<Operador> listarTodos() {
        return operadorRepository.findAll();
    }

    public Optional<Operador> buscarPorId(Integer id) {
        return operadorRepository.findById(id);
    }

    public Operador salvar(Operador operador) {
        return operadorRepository.save(operador);
    }

    public Operador atualizar(Integer id, Operador novo) {
        return operadorRepository.findById(id).map(op -> {
            op.setNome(novo.getNome());
            op.setEndereco(novo.getEndereco());
            op.setEmail(novo.getEmail());
            op.setTelefone(novo.getTelefone());
            op.setFilialId(novo.getFilialId());
            op.setFuncao(novo.getFuncao());
            return operadorRepository.save(op);
        }).orElseThrow(() -> new RuntimeException("Operador não encontrado"));
    }

    public void deletar(Integer id) {
        operadorRepository.deleteById(id);
    }
}
