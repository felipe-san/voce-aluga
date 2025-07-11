package voce.aluga.controller;

import voce.aluga.model.PagamentoDinheiro;
import voce.aluga.service.PagamentoDinheiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagamentos-dinheiro")
public class PagamentoDinheiroController {

    @Autowired
    private PagamentoDinheiroService service;

    @GetMapping
    public ResponseEntity<List<PagamentoDinheiro>> listarTodos() {
        try {
            return ResponseEntity.ok(service.listarTodos());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagamentoDinheiro> buscarPorId(@PathVariable Integer id) {
        try {
            return service.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<PagamentoDinheiro> criar(@RequestBody PagamentoDinheiro pagamento) {
        try {
            return ResponseEntity.ok(service.criar(pagamento));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagamentoDinheiro> atualizar(@PathVariable Integer id, @RequestBody PagamentoDinheiro novo) {
        try {
            return ResponseEntity.ok(service.atualizar(id, novo));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
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
