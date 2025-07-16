package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Estoque;
import voce.aluga.service.EstoqueService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/estoque")
@CrossOrigin(origins = "http://localhost:3000")
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

    @PutMapping("/{id}")
    public Estoque atualizarEstoque(@PathVariable int id, @RequestBody Estoque estoque) {
        estoque.setId(id);
        return estoqueService.salvar(estoque);
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

