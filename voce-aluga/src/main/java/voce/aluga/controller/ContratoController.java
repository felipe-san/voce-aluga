package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Contrato;
import voce.aluga.service.ContratoService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/contratos")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @PostMapping("/contrato/criar")
    public Object criarContrato(@RequestBody Contrato contrato) {
        try {
            return contratoService.salvar(contrato);
        } catch (Exception e) {
            return "Erro ao criar contrato: " + e.getMessage();
        }
    }

    @GetMapping("/contrato/lista")
    public List<Contrato> listarContratos() {
        try {
            return contratoService.listarTodos();
        } catch (Exception e) {
            System.out.println("Erro ao listar contratos: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/contrato/busca/{id}")
    public Object buscarContrato(@PathVariable int id) {
        try {
            return contratoService.buscarPorId(id);    
        } catch (Exception e) {
            return "Erro ao buscar contrato: " + e.getMessage();
        }
    }

    @DeleteMapping("/contrato/deletar/{id}")
    public String deletarContrato(@PathVariable int id) {
        try {
            contratoService.deletar(id);
            return "Contrato deletado com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar contrato: " + e.getMessage();
        }
    }

    @GetMapping("/contrato/gerar/{id}")
    public String gerarContrato(@PathVariable int id) {
        try {
            return contratoService.gerarContrato(id);
        } catch (Exception e) {
            return "Erro ao gerar contrato: " + e.getMessage();
        }
    }

    @PostMapping("/contrato/encerrar/{id}")
    public String encerrarContrato(@PathVariable int id) {
        try {
            contratoService.encerrarContrato(id);
            return "Contrato encerrado com sucesso.";
        } catch (Exception e) {
            return "Erro ao encerrar contrato: " + e.getMessage();
        }
    }

    @PostMapping("/contrato/desconto/{id}")
    public Object aplicarDesconto(@PathVariable int id, @RequestParam float valor) {
        try {
            return contratoService.aplicarDesconto(id, valor);
        } catch (Exception e) {
            return "Erro ao aplicar desconto: " + e.getMessage();
        }
    }
}
