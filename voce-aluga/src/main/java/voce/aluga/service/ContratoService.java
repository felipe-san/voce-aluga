package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Contrato;
import voce.aluga.repository.ContratoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;

    public Contrato salvar(Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    public List<Contrato> listarTodos() {
        return contratoRepository.findAll();
    }

    public Optional<Contrato> buscarPorId(int id) {
        return contratoRepository.findById(id);
    }

    public void deletar(int id) {
        contratoRepository.deleteById(id);
    }

    public String gerarContrato(int id) {
        return contratoRepository.findById(id).map(Contrato::gerarContrato).orElse("Contrato não encontrado.");
    }

    public void encerrarContrato(int id) {
        contratoRepository.findById(id).ifPresent(contrato -> {
            contrato.encerrarContrato();
            contratoRepository.save(contrato);
        });
    }

    public float aplicarDesconto(int id, float desconto) {
        Optional<Contrato> opt = contratoRepository.findById(id);
        if (opt.isPresent()) {
            Contrato contrato = opt.get();
            float novoValor = contrato.aplicarDescontos(desconto);
            contrato.setValor(novoValor);
            contratoRepository.save(contrato);
            return novoValor;
        }
        return 0;
    }

    public void atualizarStatus(int id, String status) {
        contratoRepository.findById(id).ifPresent(contrato -> {
            contrato.setStatus(status);
            contratoRepository.save(contrato);
        });
    }

    public void ativarContrato(int id) {
        atualizarStatus(id, "ATIVO");
    }

    public void concluirContrato(int id) {
        atualizarStatus(id, "CONCLUIDO");
    }

    public void cancelarContrato(int id) {
        atualizarStatus(id, "CANCELADO");
    }
}
