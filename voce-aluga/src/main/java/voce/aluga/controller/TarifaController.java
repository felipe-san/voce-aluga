package voce.aluga.controller;

import voce.aluga.model.Tarifa;
import voce.aluga.service.TarifaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarifas")
public class TarifaController {

    @Autowired
    private TarifaService service;

    @GetMapping
    public ResponseEntity<List<Tarifa>> listarTodos() {
        try {
            return ResponseEntity.ok(service.listarTodos());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarifa> buscarPorId(@PathVariable Integer id) {
        try {
            return service.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Tarifa> criar(@RequestBody Tarifa tarifa) {
        try {
            return ResponseEntity.ok(service.criar(tarifa));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarifa> atualizar(@PathVariable Integer id, @RequestBody Tarifa tarifa) {
        try {
            return ResponseEntity.ok(service.atualizar(id, tarifa));
        } catch (RuntimeException e) {
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

    @GetMapping("/{id}/atraso/{dias}")
    public ResponseEntity<Float> calcularTarifaAtraso(@PathVariable Integer id, @PathVariable int dias) {
        try {
            float valor = service.calcularTarifaAtraso(id, dias);
            return ResponseEntity.ok(valor);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/avaria/{nivel}")
    public ResponseEntity<Float> calcularTarifaAvarias(@PathVariable Integer id, @PathVariable int nivel) {
        try {
            float valor = service.calcularTarifaAvarias(id, nivel);
            return ResponseEntity.ok(valor);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
