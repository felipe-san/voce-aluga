package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Fidelidade;
import voce.aluga.service.FidelidadeService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/fidelidades")
public class FidelidadeController {

    @Autowired
    private FidelidadeService fidelidadeService;

    @PostMapping("/cadastrar")
    public Object cadastrar(@RequestBody Fidelidade fidelidade) {
        try {
            return fidelidadeService.salvar(fidelidade);
        } catch (Exception e) {
            return "Erro ao cadastrar fidelidade: " + e.getMessage();
        }
    }

    @GetMapping("/listar")
    public List<Fidelidade> listar() {
        try {
            return fidelidadeService.listarTodas();
        } catch (Exception e) {
            System.out.println("Erro ao listar fidelidades: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/{id}")
    public Object buscar(@PathVariable int id) {
        try {
            return fidelidadeService.buscarPorId(id);
        } catch (Exception e) {
            return "Erro ao buscar fidelidade: " + e.getMessage();
        }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable int id) {
        try {
            fidelidadeService.deletar(id);
            return "Fidelidade deletada com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar fidelidade: " + e.getMessage();
        }
    }
}
