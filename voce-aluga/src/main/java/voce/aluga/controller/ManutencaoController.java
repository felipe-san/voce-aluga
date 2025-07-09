package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Manutencao;
import voce.aluga.service.ManutencaoService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/manutencoes")
public class ManutencaoController {

    @Autowired
    private ManutencaoService manutencaoService;

    @PostMapping("/cadastrar")
    public Object cadastrar(@RequestBody Manutencao manutencao) {
        try {
            return manutencaoService.salvar(manutencao);
        } catch (Exception e) {
            return "Erro ao cadastrar manutenção: " + e.getMessage();
        }
    }

    @GetMapping("/listar")
    public List<Manutencao> listar() {
        try {
            return manutencaoService.listarTodas();
        } catch (Exception e) {
            System.out.println("Erro ao listar manutenções: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/{id}")
    public Object buscar(@PathVariable int id) {
        try {
            return manutencaoService.buscarPorId(id);
        } catch (Exception e) {
            return "Erro ao buscar manutenção: " + e.getMessage();
        }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable int id) {
        try {
            manutencaoService.deletar(id);
            return "Manutenção deletada com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar manutenção: " + e.getMessage();
        }
    }
}
