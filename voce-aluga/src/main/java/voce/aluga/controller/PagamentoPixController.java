package voce.aluga.controller;

import voce.aluga.model.PagamentoPix;
import voce.aluga.service.PagamentoPixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagamentos-pix")
public class PagamentoPixController {

    @Autowired
    private PagamentoPixService service;

    @GetMapping
    public ResponseEntity<List<PagamentoPix>> listarTodos() {
        try {
            return ResponseEntity.ok(service.listarTodos());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagamentoPix> buscarPorId(@PathVariable Integer id) {
        try {
            return service.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<PagamentoPix> criar(@RequestBody PagamentoPix pagamentoPix) {
        try {
            return ResponseEntity.ok(service.criar(pagamentoPix));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagamentoPix> atualizar(@PathVariable Integer id, @RequestBody PagamentoPix novo) {
        try {
            return ResponseEntity.ok(service.atualizar(id, novo));
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

    @GetMapping("/{id}/qrcode")
    public ResponseEntity<String> gerarQrCode(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(service.gerarQrCode(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/confirmar")
    public ResponseEntity<String> confirmarPagamento(@PathVariable Integer id) {
        boolean confirmado = service.confirmarPagamento(id);
        return confirmado
                ? ResponseEntity.ok("Pagamento confirmado com sucesso.")
                : ResponseEntity.badRequest().body("Não foi possível confirmar o pagamento.");
    }

    @PutMapping("/{id}/estornar")
    public ResponseEntity<String> estornarPagamento(@PathVariable Integer id) {
        boolean estornado = service.estornarPagamento(id);
        return estornado
                ? ResponseEntity.ok("Pagamento estornado com sucesso.")
                : ResponseEntity.badRequest().body("Não foi possível estornar o pagamento.");
    }
}
