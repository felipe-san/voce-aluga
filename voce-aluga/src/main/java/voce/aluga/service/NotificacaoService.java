package voce.aluga.service;

import voce.aluga.model.Notificacao;
import voce.aluga.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    public List<Notificacao> listarTodas() {
        return notificacaoRepository.findAll();
    }

    public Optional<Notificacao> buscarPorId(Integer id) {
        return notificacaoRepository.findById(id);
    }

    public Notificacao criar(Notificacao notificacao) {
        notificacao.enviarNotificacao(notificacao.getMensagem());
        return notificacaoRepository.save(notificacao);
    }

    public Notificacao atualizar(Integer id, Notificacao nova) {
        return notificacaoRepository.findById(id).map(n -> {
            n.setClienteId(nova.getClienteId());
            n.setTipoNotificacao(nova.getTipoNotificacao());
            n.setMensagem(nova.getMensagem());
            n.setStatus(nova.getStatus());
            return notificacaoRepository.save(n);
        }).orElseThrow(() -> new RuntimeException("Notificação não encontrada"));
    }

    public void deletar(Integer id) {
        notificacaoRepository.deleteById(id);
    }

    public Notificacao atualizarStatus(Integer id, String novoStatus) {
        return notificacaoRepository.findById(id).map(n -> {
            n.atualizarStatus(novoStatus);
            return notificacaoRepository.save(n);
        }).orElseThrow(() -> new RuntimeException("Notificação não encontrada"));
    }
}
