package voce.aluga.service;

import voce.aluga.model.Tarifa;
import voce.aluga.model.Veiculo;
import voce.aluga.repository.TarifaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarifaService {

    @Autowired
    private TarifaRepository repository;

    public List<Tarifa> listarTodos() {
        return repository.findAll();
    }

    public Optional<Tarifa> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Tarifa criar(Tarifa tarifa) {
        return repository.save(tarifa);
    }

    public Tarifa atualizar(Integer id, Tarifa novo) {
        return repository.findById(id).map(t -> {
            t.setTipoTarifa(novo.getTipoTarifa());
            t.setValor(novo.getValor());
            t.setDescricao(novo.getDescricao());
            return repository.save(t);
        }).orElseThrow(() -> new RuntimeException("Tarifa não encontrada"));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }

    public float calcularTarifaAtraso(Integer id, int diasAtraso) {
        Tarifa tarifa = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarifa não encontrada"));
        return tarifa.calcularTarifaAtraso(diasAtraso);
    }

    public float calcularTarifaAvarias(Integer id, int nivelAvaria) {
        Tarifa tarifa = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarifa não encontrada"));
        return tarifa.calcularTarifaAvarias(nivelAvaria);
    }

    public float definirTarifaVeiculo(Integer id, Veiculo veiculo) {
        Tarifa tarifa = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarifa não encontrada"));
        return tarifa.definirTarifaVeiculo(veiculo);
    }

    public List<Tarifa> gerarRelatorioTarifas() {
        return repository.findAll();
    }
}
