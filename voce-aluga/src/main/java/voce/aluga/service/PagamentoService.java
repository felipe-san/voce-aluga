package voce.aluga.service;

import voce.aluga.model.Pagamento;
import voce.aluga.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public List<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    public Optional<Pagamento> buscarPorId(Integer id) {
        return pagamentoRepository.findById(id);
    }

    public Pagamento criar(Pagamento pagamento) {
        return pagamentoRepository.save(pagamento);
    }

    public Pagamento atualizar(Integer id, Pagamento novo) {
        return pagamentoRepository.findById(id).map(p -> {
            p.setReservaId(novo.getReservaId());
            p.setDataPagamento(novo.getDataPagamento());
            p.setValor(novo.getValor());
            p.setFormaPagamento(novo.getFormaPagamento());
            p.setComprovante(novo.getComprovante());
            p.setStatus(novo.getStatus());
            return pagamentoRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
    }

    public void deletar(Integer id) {
        pagamentoRepository.deleteById(id);
    }

    public Pagamento finalizarPagamento(Integer id) {
        return pagamentoRepository.findById(id).map(p -> {
            if (p.finalizarPagamento()) {
                return pagamentoRepository.save(p);
            } else {
                throw new RuntimeException("Pagamento já finalizado ou inválido");
            }
        }).orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
    }

    public Pagamento cancelarPagamento(Integer id) {
        return pagamentoRepository.findById(id).map(p -> {
            if (p.cancelarPagamento()) {
                return pagamentoRepository.save(p);
            } else {
                throw new RuntimeException("Pagamento já cancelado ou inválido");
            }
        }).orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
    }
}
