package voce.aluga.controller;

import voce.aluga.model.Matriz;
import voce.aluga.service.MatrizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matriz")
public class MatrizController {

    @Autowired
    private MatrizService matrizService;

    @GetMapping
    public ResponseEntity<List<Matriz>> listarTodas() {
        try {
            return ResponseEntity.ok(matrizService.listarTodas());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Matriz> buscarPorId(@PathVariable Integer id) {
        try {
            return matrizService.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Matriz> criar(@RequestBody Matriz matriz) {
        try {
            return ResponseEntity.ok(matrizService.salvar(matriz));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Matriz> atualizar(@PathVariable Integer id, @RequestBody Matriz novaMatriz) {
        try {
            return ResponseEntity.ok(matrizService.atualizar(id, novaMatriz));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        try {
            matrizService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

