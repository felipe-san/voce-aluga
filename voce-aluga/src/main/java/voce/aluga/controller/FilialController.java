package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Filial;
import voce.aluga.service.FilialService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/filiais")
public class FilialController {

    @Autowired
    private FilialService filialService;

    @PostMapping("/cadastrar")
    public Object cadastrar(@RequestBody Filial filial) {
        try {
            return filialService.salvar(filial);
        } catch (Exception e) {
            return "Erro ao cadastrar filial: " + e.getMessage();
        }
    }

    @GetMapping("/listar")
    public List<Filial> listar() {
        try {
            return filialService.listarTodas();
        } catch (Exception e) {
            System.out.println("Erro ao listar filiais: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/{id}")
    public Object buscar(@PathVariable int id) {
        try {
            return filialService.buscarPorId(id);
        } catch (Exception e) {
            return "Erro ao buscar filial: " + e.getMessage();
        }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable int id) {
        try {
            filialService.deletar(id);
            return "Filial deletada com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar filial: " + e.getMessage();
        }
    }
}

