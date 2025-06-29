package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Devolucao;
import voce.aluga.service.DevolucaoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/devolucoes")
public class DevolucaoController {

    @Autowired
    private DevolucaoService devolucaoService;

    @PostMapping
    public Devolucao registrarDevolucao(@RequestBody Devolucao devolucao) {
        return devolucaoService.salvar(devolucao);
    }

    @GetMapping
    public List<Devolucao> listarDevolucoes() {
        return devolucaoService.listarTodas();
    }

    @GetMapping("/{id}")
    public Optional<Devolucao> buscarDevolucao(@PathVariable int id) {
        return devolucaoService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletarDevolucao(@PathVariable int id) {
        devolucaoService.deletar(id);
    }

    @GetMapping("/{id}/avarias")
    public String verificarAvarias(@PathVariable int id) {
        return devolucaoService.verificarAvarias(id);
    }
}
