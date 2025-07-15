package voce.aluga.controller;

import voce.aluga.model.Operador;
import voce.aluga.service.OperadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/operadores")
public class OperadorController {

    @Autowired
    private OperadorService operadorService;

    @GetMapping
    public ResponseEntity<List<Operador>> listarTodos() {
        try {
            return ResponseEntity.ok(operadorService.listarTodos());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Operador> buscarPorId(@PathVariable Integer id) {
        try {
            return operadorService.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Operador> salvar(@RequestBody Operador operador) {
        try {
            return ResponseEntity.ok(operadorService.salvar(operador));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Operador> atualizar(@PathVariable Integer id, @RequestBody Operador operador) {
        try {
            return ResponseEntity.ok(operadorService.atualizar(id, operador));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        try {
            operadorService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

