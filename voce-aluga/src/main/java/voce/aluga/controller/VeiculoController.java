package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Veiculo;
import voce.aluga.service.VeiculoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/veiculos")
@CrossOrigin(origins = "http://localhost:3000")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @PostMapping
    public Veiculo criarVeiculo(@RequestBody Veiculo veiculo) {
        return veiculoService.salvar(veiculo);
    }

    @GetMapping
    public List<Veiculo> listarTodos() {
        return veiculoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Veiculo> buscarPorId(@PathVariable Long id) {
        return veiculoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Veiculo atualizarVeiculo(@PathVariable Long id, @RequestBody Veiculo veiculo) {
        veiculo.setId(id);
        return veiculoService.salvar(veiculo);
    }

    @DeleteMapping("/{id}")
    public void deletarVeiculo(@PathVariable Long id) {
        veiculoService.deletar(id);
    }

    @GetMapping("/disponiveis")
    public List<Veiculo> listarDisponiveis() {
        return veiculoService.listarPorStatus("disponivel");
    }

    @PostMapping("/{id}/manutencao")
    public void enviarParaManutencao(@PathVariable Long id) {
        veiculoService.atualizarStatus(id, "manutencao");
    }

    @PostMapping("/{id}/disponivel")
    public void marcarComoDisponivel(@PathVariable Long id) {
        veiculoService.atualizarStatus(id, "disponivel");
    }
}
