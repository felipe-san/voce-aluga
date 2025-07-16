package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Veiculo;
import voce.aluga.repository.VeiculoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Veiculo salvar(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    public Optional<Veiculo> buscarPorId(Long id) {
        return veiculoRepository.findById(id);
    }

    public void deletar(Long id) {
        veiculoRepository.deleteById(id);
    }

    public List<Veiculo> buscarPorStatus(String status) {
        return veiculoRepository.findByStatus(status);
    }

    public List<Veiculo> buscarPorCategoria(String categoria) {
        return veiculoRepository.findByCategoria(categoria);
    }

    public List<Veiculo> buscarPorMarca(String marca) {
        return veiculoRepository.findByMarca(marca);
    }

    public List<Veiculo> buscarPorFilial(Integer filialId) {
        return veiculoRepository.findByFilialId(filialId);
    }

    public List<Veiculo> listarPorStatus(String status) {
        return veiculoRepository.findByStatus(status);
    }

    public void atualizarStatus(Long id, String novoStatus) {
        Optional<Veiculo> veiculo = veiculoRepository.findById(id);
        if (veiculo.isPresent()) {
            Veiculo v = veiculo.get();
            v.setStatus(novoStatus);
            veiculoRepository.save(v);
        }
    }
}
