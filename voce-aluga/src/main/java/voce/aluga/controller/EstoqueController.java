package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Estoque;
import voce.aluga.service.EstoqueService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/estoques")
public class EstoqueController {

    @Autowired
    private EstoqueService estoqueService;

    @PostMapping("/estoque/criar/{id}")
    public Object criar(@RequestBody Estoque estoque) {
        try {
            return estoqueService.salvar(estoque);
        } catch (Exception e) {
            return "Erro ao criar estoque: " + e.getMessage();
        }
    }

    @GetMapping("/estoque/lista")
    public List<Estoque> listarTodos() {
        try {
            return estoqueService.listarTodos();
        } catch (Exception e) {
            System.out.println("Erro ao listar estoques: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/estoque/{id}")
    public Object buscarPorId(@PathVariable int id) {
        try {
            return estoqueService.buscarPorId(id);
        } catch (Exception e) {
            return "Erro ao buscar estoque: " + e.getMessage();
        }
    }

    @DeleteMapping("/estoque/deletar/{id}")
    public String deletar(@PathVariable int id) {
        try {
            estoqueService.deletar(id);
            return "Estoque deletado com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar estoque: " + e.getMessage();
        }
    }

    @GetMapping("/estoque/{id}/disponiveis")
    public Object consultarVeiculosDisponiveis(@PathVariable int id) {
        try {
            return estoqueService.consultarVeiculosDisponiveis(id);
        } catch (Exception e) {
            return "Erro ao consultar veículos disponíveis: " + e.getMessage();
        }
    }

    @GetMapping("/estoque/{id}/manutencao")
    public Object veiculosManutencao(@PathVariable int id) {
        try {
            return estoqueService.verificarVeiculoManutencao(id);
        } catch (Exception e) {
            return "Erro ao consultar veículos em manutenção: " + e.getMessage();
        }
    }

    @GetMapping("/estoque/{id}/alocados")
    public Object veiculosAlocados(@PathVariable int id) {
        try {
            return estoqueService.verificarVeiculosAlocados(id);
        } catch (Exception e) {
            return "Erro ao consultar veículos alocados: " + e.getMessage();
        }
    }
}