package voce.aluga.service;

import voce.aluga.model.PagamentoPix;
import voce.aluga.repository.PagamentoPixRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoPixService {

    @Autowired
    private PagamentoPixRepository repository;

    public List<PagamentoPix> listarTodos() {
        return repository.findAll();
    }

    public Optional<PagamentoPix> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public PagamentoPix criar(PagamentoPix pagamentoPix) {
        return repository.save(pagamentoPix);
    }

    public PagamentoPix atualizar(Integer id, PagamentoPix novo) {
        return repository.findById(id).map(p -> {
            p.setReservaId(novo.getReservaId());
            p.setDataPagamento(novo.getDataPagamento());
            p.setValor(novo.getValor());
            p.setFormaPagamento(novo.getFormaPagamento());
            p.setComprovante(novo.getComprovante());
            p.setStatus(novo.getStatus());
            p.setChavePix(novo.getChavePix());
            return repository.save(p);
        }).orElseThrow(() -> new RuntimeException("PagamentoPix não encontrado"));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }

    public String gerarQrCode(Integer id) {
        return repository.findById(id)
                .map(PagamentoPix::gerarQrCode)
                .orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
    }

    public boolean confirmarPagamento(Integer id) {
        return repository.findById(id).map(pix -> {
            boolean confirmado = pix.confirmarPagamento();
            if (confirmado) repository.save(pix);
            return confirmado;
        }).orElse(false);
    }

    public boolean estornarPagamento(Integer id) {
        return repository.findById(id).map(pix -> {
            boolean estornado = pix.estornarPagamento();
            if (estornado) repository.save(pix);
            return estornado;
        }).orElse(false);
    }
}
