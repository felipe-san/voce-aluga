package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Estoque;
import voce.aluga.service.EstoqueService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/estoques")
public class EstoqueController {

    @Autowired
    private EstoqueService estoqueService;

    @PostMapping
    public Estoque criar(@RequestBody Estoque estoque) {
        return estoqueService.salvar(estoque);
    }

    @GetMapping
    public List<Estoque> listarTodos() {
        return estoqueService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Estoque> buscarPorId(@PathVariable int id) {
        return estoqueService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id) {
        estoqueService.deletar(id);
    }

    @GetMapping("/{id}/disponiveis")
    public List<Integer> consultarVeiculosDisponiveis(@PathVariable int id) {
        return estoqueService.consultarVeiculosDisponiveis(id);
    }

    @GetMapping("/{id}/manutencao")
    public List<Integer> veiculosManutencao(@PathVariable int id) {
        return estoqueService.verificarVeiculoManutencao(id);
    }

    @GetMapping("/{id}/alocados")
    public List<Integer> veiculosAlocados(@PathVariable int id) {
        return estoqueService.verificarVeiculosAlocados(id);
    }
} 

