package voce.aluga.controller;

import voce.aluga.model.Sistema;
import voce.aluga.service.SistemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/sistema")
public class SistemaController {

    @Autowired
    private SistemaService service;

    @GetMapping
    public ResponseEntity<List<Sistema>> listar() {
        try {
            return ResponseEntity.ok(service.listarTodos());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sistema> buscar(@PathVariable Integer id) {
        try {
            return service.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Sistema> criar(@RequestBody Sistema sistema) {
        try {
            return ResponseEntity.ok(service.criar(sistema));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sistema> atualizar(@PathVariable Integer id, @RequestBody Sistema sistema) {
        try {
            return ResponseEntity.ok(service.atualizar(id, sistema));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        try {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/backup")
    public ResponseEntity<String> realizarBackup() {
        try {
            service.realizarBackup();
            return ResponseEntity.ok("Backup realizado.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao realizar backup.");
        }
    }

    @GetMapping("/restaurar")
    public ResponseEntity<String> restaurarBackup() {
        try {
            service.restaurarBackup();
            return ResponseEntity.ok("Backup restaurado.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao restaurar backup.");
        }
    }

    @GetMapping("/relatorio/reservas")
    public ResponseEntity<List<String>> relatorioReservas() {
        return ResponseEntity.ok(service.gerarRelatorioReservas());
    }

    @GetMapping("/relatorio/pagamentos")
    public ResponseEntity<List<String>> relatorioPagamentos() {
        return ResponseEntity.ok(service.gerarRelatorioPagamentos());
    }
}
