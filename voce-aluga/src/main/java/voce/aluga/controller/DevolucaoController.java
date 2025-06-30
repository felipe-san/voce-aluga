package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Devolucao;
import voce.aluga.service.DevolucaoService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/devolucoes")
public class DevolucaoController {

    @Autowired
    private DevolucaoService devolucaoService;

    @PostMapping("/devolucao/registrar/{id}")
    public Object registrarDevolucao(@RequestBody Devolucao devolucao) {
        try {
            return devolucaoService.salvar(devolucao);
        } catch (Exception e) {
            return "Erro ao registrar devolução: " + e.getMessage();
        }
    }

    @GetMapping("/devolucao/listar")
    public List<Devolucao> listarDevolucoes() {
        try {
            return devolucaoService.listarTodas();
        } catch (Exception e) {
            System.out.println("Erro ao listar devoluções: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/devolucao/{id}")
    public Object buscarDevolucao(@PathVariable int id) {
        try {
            return devolucaoService.buscarPorId(id);
        } catch (Exception e) {
            return "Erro ao buscar devolução: " + e.getMessage();
        }
    }

    @DeleteMapping("/devolucao/{id}")
    public String deletarDevolucao(@PathVariable int id) {
        try {
            devolucaoService.deletar(id);
            return "Devolução deletada com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar devolução: " + e.getMessage();
        }
    }

    @GetMapping("/devolucao/{id}/avarias")
    public String verificarAvarias(@PathVariable int id) {
        try {
            return devolucaoService.verificarAvarias(id);
        } catch (Exception e) {
            return "Erro ao verificar avarias: " + e.getMessage();
        }
    }
}
