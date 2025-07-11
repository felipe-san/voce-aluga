package voce.aluga.service;

import voce.aluga.model.Veiculo;
import voce.aluga.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    public Optional<Veiculo> buscarPorId(Integer id) {
        return veiculoRepository.findById(id);
    }

    public Veiculo cadastrarVeiculo(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    public Veiculo atualizarVeiculo(Integer id, Veiculo novo) {
        return veiculoRepository.findById(id).map(v -> {
            v.setModelo(novo.getModelo());
            v.setAno(novo.getAno());
            v.setPlaca(novo.getPlaca());
            v.setQuilometragem(novo.getQuilometragem());
            v.setCapacidadeTanque(novo.getCapacidadeTanque());
            v.setConsumoMedio(novo.getConsumoMedio());
            v.setDataProximaManutencao(novo.getDataProximaManutencao());
            v.setHistoricoManutencao(novo.getHistoricoManutencao());
            v.setStatus(novo.getStatus());
            v.setFilialId(novo.getFilialId());
            v.setGrupo(novo.getGrupo());
            return veiculoRepository.save(v);
        }).orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
    }

    public void deletar(Integer id) {
        veiculoRepository.deleteById(id);
    }
}
