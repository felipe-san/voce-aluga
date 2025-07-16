package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Veiculo;
import voce.aluga.repository.VeiculoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Optional<Veiculo> buscarPorId(int id) {
        return veiculoRepository.findById(id);
    }

    public void deletar(int id) {
        veiculoRepository.deleteById(id);
    }

    public List<Veiculo> listarDisponiveis() {
        return veiculoRepository.findAll().stream()
                .filter(Veiculo::isDisponivel)
                .collect(Collectors.toList());
    }

    public void enviarParaManutencao(int id) {
        Optional<Veiculo> veiculoOpt = veiculoRepository.findById(id);
        if (veiculoOpt.isPresent()) {
            Veiculo veiculo = veiculoOpt.get();
            veiculo.setStatus("MANUTENCAO");
            veiculo.setDisponivel(false);
            veiculoRepository.save(veiculo);
        }
    }

    public void marcarComoDisponivel(int id) {
        Optional<Veiculo> veiculoOpt = veiculoRepository.findById(id);
        if (veiculoOpt.isPresent()) {
            Veiculo veiculo = veiculoOpt.get();
            veiculo.setStatus("DISPONIVEL");
            veiculo.setDisponivel(true);
            veiculoRepository.save(veiculo);
        }
    }

    public List<Veiculo> buscarPorCategoria(String categoria) {
        return veiculoRepository.findAll().stream()
                .filter(v -> categoria.equals(v.getCategoria()))
                .collect(Collectors.toList());
    }
}
