package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Contrato;
import voce.aluga.service.ContratoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contratos")
@CrossOrigin(origins = "http://localhost:3000")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @PostMapping
    public Contrato criarContrato(@RequestBody Contrato contrato) {
        return contratoService.salvar(contrato);
    }

    @GetMapping
    public List<Contrato> listarContratos() {
        return contratoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Contrato> buscarContrato(@PathVariable int id) {
        return contratoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Contrato atualizarContrato(@PathVariable int id, @RequestBody Contrato contrato) {
        contrato.setId(id);
        return contratoService.salvar(contrato);
    }

    @DeleteMapping("/{id}")
    public void deletarContrato(@PathVariable int id) {
        contratoService.deletar(id);
    }

    @GetMapping("/{id}/gerar")
    public String gerarContrato(@PathVariable int id) {
        return contratoService.gerarContrato(id);
    }

    @PostMapping("/{id}/encerrar")
    public void encerrarContrato(@PathVariable int id) {
        contratoService.encerrarContrato(id);
    }

    @PostMapping("/{id}/desconto")
    public float aplicarDesconto(@PathVariable int id, @RequestParam float valor) {
        return contratoService.aplicarDesconto(id, valor);
    }

    @PutMapping("/{id}/status")
    public void atualizarStatus(@PathVariable int id, @RequestParam String status) {
        contratoService.atualizarStatus(id, status);
    }

    @PostMapping("/{id}/ativar")
    public void ativarContrato(@PathVariable int id) {
        contratoService.ativarContrato(id);
    }

    @PostMapping("/{id}/concluir")
    public void concluirContrato(@PathVariable int id) {
        contratoService.concluirContrato(id);
    }

    @PostMapping("/{id}/cancelar")
    public void cancelarContrato(@PathVariable int id) {
        contratoService.cancelarContrato(id);
    }
}
