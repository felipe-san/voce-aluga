package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Estoque;
import voce.aluga.repository.EstoqueRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EstoqueService {

    @Autowired
    private EstoqueRepository estoqueRepository;

    public Estoque salvar(Estoque estoque) {
        return estoqueRepository.save(estoque);
    }

    public List<Estoque> listarTodos() {
        return estoqueRepository.findAll();
    }

    public Optional<Estoque> buscarPorId(int id) {
        return estoqueRepository.findById(id);
    }

    public void deletar(int id) {
        estoqueRepository.deleteById(id);
    }

    public List<Integer> consultarVeiculosDisponiveis(int estoqueId) {
        return buscarPorId(estoqueId).map(Estoque::getVeiculosDisponiveis).orElse(null);
    }

    public List<Integer> verificarVeiculoManutencao(int estoqueId) {
        return buscarPorId(estoqueId).map(Estoque::getVeiculosManutencao).orElse(null);
    }

    public List<Integer> verificarVeiculosAlocados(int estoqueId) {
        return buscarPorId(estoqueId).map(Estoque::getVeiculosAlocados).orElse(null);
    }
}

