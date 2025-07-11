package voce.aluga.controller;

import voce.aluga.model.PagamentoCartao;
import voce.aluga.service.PagamentoCartaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagamentos-cartao")
public class PagamentoCartaoController {

    @Autowired
    private PagamentoCartaoService service;

    @GetMapping
    public ResponseEntity<List<PagamentoCartao>> listarTodos() {
        try {
            return ResponseEntity.ok(service.listarTodos());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagamentoCartao> buscarPorId(@PathVariable Integer id) {
        try {
            return service.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<PagamentoCartao> criar(@RequestBody PagamentoCartao pagamentoCartao) {
        try {
            return ResponseEntity.ok(service.criar(pagamentoCartao));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagamentoCartao> atualizar(@PathVariable Integer id, @RequestBody PagamentoCartao novo) {
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
