package voce.aluga.controller;

import voce.aluga.model.Transferencia;
import voce.aluga.service.TransferenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transferencias")
public class TransferenciaController {

    @Autowired
    private TransferenciaService service;

    @GetMapping
    public ResponseEntity<List<Transferencia>> listarTodas() {
        try {
            return ResponseEntity.ok(service.listarTodas());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transferencia> consultar(@PathVariable Integer id) {
        try {
            return service.consultarTransferencia(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Transferencia> solicitar(@RequestBody Transferencia transferencia) {
        try {
            Transferencia nova = service.solicitarTransferencia(transferencia);
            service.notificarFilial(nova);
            return ResponseEntity.ok(nova);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/confirmar")
    public ResponseEntity<Transferencia> confirmar(@PathVariable Integer id) {
        try {
            Transferencia confirmada = service.confirmarTransferencia(id);
            service.notificarFilial(confirmada);
            return ResponseEntity.ok(confirmada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Transferencia> cancelar(@PathVariable Integer id) {
        try {
            Transferencia cancelada = service.cancelarTransferencia(id);
            service.notificarFilial(cancelada);
            return ResponseEntity.ok(cancelada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/transito")
    public ResponseEntity<List<Transferencia>> veiculosEmTransito() {
        try {
            return ResponseEntity.ok(service.veiculosEmTransito());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/relatorio")
    public ResponseEntity<List<Transferencia>> relatorio() {
        try {
            return ResponseEntity.ok(service.gerarRelatorioTransferencias());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
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
}
