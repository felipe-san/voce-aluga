package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Auditoria;
import voce.aluga.service.AuditoriaService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auditorias")
public class AuditoriaController {

    @Autowired
    private AuditoriaService auditoriaService;

    @PostMapping("/auditoria/criar/{id}")
    public Object criarAuditoria(@RequestBody Auditoria auditoria) {
        try {
            return auditoriaService.salvar(auditoria);
        } catch (Exception e) {
            return "Erro ao criar auditoria: " + e.getMessage();
        }
    }

    @GetMapping("/auditoria/lista")
    public List<Auditoria> listarTodas() {
        try {
            return auditoriaService.listarTodas();
        } catch (Exception e) {
            System.out.println("Erro ao listar auditorias: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/auditoria/busca/{id}")
    public Object buscarPorId(@PathVariable int id) {
        try {
            return auditoriaService.buscarPorId(id);
        } catch (Exception e) {
            return "Erro ao buscar auditoria: " + e.getMessage();
        }
    }

    @DeleteMapping("/auditoria/deletar/{id}")
    public String deletarAuditoria(@PathVariable int id) {
        try {
            auditoriaService.deletar(id);
            return "Auditoria deletada com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar auditoria: " + e.getMessage();
        }
    }
}
