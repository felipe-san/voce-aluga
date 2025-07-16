package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Veiculo;
import voce.aluga.service.VeiculoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/veiculos")
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
    public Optional<Veiculo> buscarPorId(@PathVariable int id) {
        return veiculoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Veiculo atualizarVeiculo(@PathVariable int id, @RequestBody Veiculo veiculo) {
        veiculo.setId(id);
        return veiculoService.salvar(veiculo);
    }

    @DeleteMapping("/{id}")
    public void deletarVeiculo(@PathVariable int id) {
        veiculoService.deletar(id);
    }

    @GetMapping("/disponiveis")
    public List<Veiculo> listarDisponiveis() {
        return veiculoService.listarDisponiveis();
    }

    @PostMapping("/{id}/manutencao")
    public void enviarParaManutencao(@PathVariable int id) {
        veiculoService.enviarParaManutencao(id);
    }

    @PostMapping("/{id}/disponivel")
    public void marcarComoDisponivel(@PathVariable int id) {
        veiculoService.marcarComoDisponivel(id);
    }
}
