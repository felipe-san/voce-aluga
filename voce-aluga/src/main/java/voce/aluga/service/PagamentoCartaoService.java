package voce.aluga.service;

import voce.aluga.model.PagamentoCartao;
import voce.aluga.repository.PagamentoCartaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoCartaoService {

    @Autowired
    private PagamentoCartaoRepository repository;

    public List<PagamentoCartao> listarTodos() {
        return repository.findAll();
    }

    public Optional<PagamentoCartao> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public PagamentoCartao criar(PagamentoCartao pagamentoCartao) {
        pagamentoCartao.processarPagamento(pagamentoCartao.getValor());
        return repository.save(pagamentoCartao);
    }

    public PagamentoCartao atualizar(Integer id, PagamentoCartao novo) {
        return repository.findById(id).map(p -> {
            p.setReservaId(novo.getReservaId());
            p.setDataPagamento(novo.getDataPagamento());
            p.setValor(novo.getValor());
            p.setFormaPagamento(novo.getFormaPagamento());
            p.setComprovante(novo.getComprovante());
            p.setStatus(novo.getStatus());

            p.setTipoCartao(novo.getTipoCartao());
            p.setNumeroCartao(novo.getNumeroCartao());
            p.setTitular(novo.getTitular());
            p.setBandeira(novo.getBandeira());
            p.setValidade(novo.getValidade());
            p.setCodigoSeguranca(novo.getCodigoSeguranca());
            p.setParcelas(novo.getParcelas());

            return repository.save(p);
        }).orElseThrow(() -> new RuntimeException("PagamentoCartao não encontrado"));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}

