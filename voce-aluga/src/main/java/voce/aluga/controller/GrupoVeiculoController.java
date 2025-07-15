package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.GrupoVeiculo;
import voce.aluga.service.GrupoVeiculoService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/grupo-veiculos")
public class GrupoVeiculoController {

    @Autowired
    private GrupoVeiculoService grupoVeiculoService;

    @PostMapping("/cadastrar")
    public Object cadastrar(@RequestBody GrupoVeiculo grupo) {
        try {
            return grupoVeiculoService.salvar(grupo);
        } catch (Exception e) {
            return "Erro ao cadastrar grupo de veículo: " + e.getMessage();
        }
    }

    @GetMapping("/listar")
    public List<GrupoVeiculo> listarTodos() {
        try {
            return grupoVeiculoService.listarTodos();
        } catch (Exception e) {
            System.out.println("Erro ao listar grupos de veículos: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/{id}")
    public Object buscar(@PathVariable int id) {
        try {
            return grupoVeiculoService.buscarPorId(id);
        } catch (Exception e) {
            return "Erro ao buscar grupo de veículo: " + e.getMessage();
        }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable int id) {
        try {
            grupoVeiculoService.deletar(id);
            return "Grupo de veículo deletado com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar grupo de veículo: " + e.getMessage();
        }
    }
}
