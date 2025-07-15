package voce.aluga.service;

import voce.aluga.model.Transferencia;
import voce.aluga.repository.TransferenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TransferenciaService {

    @Autowired
    private TransferenciaRepository repository;

    public List<Transferencia> listarTodas() {
        return repository.findAll();
    }

    public Optional<Transferencia> consultarTransferencia(Integer id) {
        return repository.findById(id);
    }

    public Transferencia solicitarTransferencia(Transferencia t) {
        t.setInicioTransferencia(new Date());
        t.setStatus("solicitada");
        return repository.save(t);
    }

    public Transferencia confirmarTransferencia(Integer id) {
        return repository.findById(id).map(t -> {
            t.setStatus("concluída");
            t.setFinalTransferencia(new Date());
            return repository.save(t);
        }).orElseThrow(() -> new RuntimeException("Transferência não encontrada"));
    }

    public Transferencia cancelarTransferencia(Integer id) {
        return repository.findById(id).map(t -> {
            t.setStatus("cancelada");
            return repository.save(t);
        }).orElseThrow(() -> new RuntimeException("Transferência não encontrada"));
    }

    public List<Transferencia> veiculosEmTransito() {
        return repository.findByStatus("em trânsito");
    }

    public List<Transferencia> gerarRelatorioTransferencias() {
        return repository.findAll(); 
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }

    public void notificarFilial(Transferencia transferencia) {
        System.out.println("Notificação enviada às filiais " + transferencia.getFilialOrigemId() +
                " e " + transferencia.getFilialDestinoId() +
                ": status = " + transferencia.getStatus());
    }
}

