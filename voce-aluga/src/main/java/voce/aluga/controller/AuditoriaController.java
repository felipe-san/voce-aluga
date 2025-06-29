package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Auditoria;
import voce.aluga.service.AuditoriaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auditorias")
public class AuditoriaController {

    @Autowired
    private AuditoriaService auditoriaService;

    @PostMapping
    public Auditoria criarAuditoria(@RequestBody Auditoria auditoria) {
        return auditoriaService.salvar(auditoria);
    }

    @GetMapping
    public List<Auditoria> listarTodas() {
        return auditoriaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Optional<Auditoria> buscarPorId(@PathVariable int id) {
        return auditoriaService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletarAuditoria(@PathVariable int id) {
        auditoriaService.deletar(id);
    }
}
