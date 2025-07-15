package voce.aluga.service;

import voce.aluga.model.PagamentoDinheiro;
import voce.aluga.repository.PagamentoDinheiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoDinheiroService {

    @Autowired
    private PagamentoDinheiroRepository repository;

    public List<PagamentoDinheiro> listarTodos() {
        return repository.findAll();
    }

    public Optional<PagamentoDinheiro> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public PagamentoDinheiro criar(PagamentoDinheiro pagamentoDinheiro) {
        pagamentoDinheiro.validarNota();
        return repository.save(pagamentoDinheiro);
    }

    public PagamentoDinheiro atualizar(Integer id, PagamentoDinheiro novo) {
        return repository.findById(id).map(p -> {
            p.setReservaId(novo.getReservaId());
            p.setDataPagamento(novo.getDataPagamento());
            p.setValor(novo.getValor());
            p.setFormaPagamento(novo.getFormaPagamento());
            p.setComprovante(novo.getComprovante());
            p.setStatus(novo.getStatus());

            p.setValorRecebido(novo.getValorRecebido());
            p.setTroco(novo.getTroco());

            return repository.save(p);
        }).orElseThrow(() -> new RuntimeException("PagamentoDinheiro não encontrado"));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
