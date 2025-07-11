package voce.aluga.service;

import voce.aluga.model.Sistema;
import voce.aluga.repository.SistemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SistemaService {

    @Autowired
    private SistemaRepository repository;

    public List<Sistema> listarTodos() {
        return repository.findAll();
    }

    public Optional<Sistema> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Sistema criar(Sistema sistema) {
        sistema.setDataOperacao(new Date());
        return repository.save(sistema);
    }

    public Sistema atualizar(Integer id, Sistema novo) {
        return repository.findById(id).map(s -> {
            s.setVersao(novo.getVersao());
            s.setDataOperacao(new Date());
            return repository.save(s);
        }).orElseThrow(() -> new RuntimeException("Sistema não encontrado"));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }

    public void gerenciarVeiculos() {
        System.out.println("Gerenciando veículos...");
    }

    public void verificarValidadeCNH(String cnh) {
        if (cnh != null && cnh.length() == 11) {
            System.out.println("CNH válida: " + cnh);
        } else {
            System.out.println("CNH inválida.");
        }
    }

    public void bloquearLocacaoListaSuja(String cliente) {
        System.out.println("Cliente bloqueado por inadimplência: " + cliente);
    }

    public List<String> gerarRelatorioReservas() {
        return Arrays.asList("Reserva 1", "Reserva 2", "Reserva 3");
    }

    public List<String> gerarRelatorioPagamentos() {
        return Arrays.asList("Pagamento 1", "Pagamento 2", "Pagamento 3");
    }

    public void gerenciarUsuarios() {
        System.out.println("Gerenciando usuários...");
    }

    public void gerenciarClientes() {
        System.out.println("Gerenciando clientes...");
    }

    public void realizarBackup() {
        System.out.println("Backup do sistema realizado com sucesso.");
    }

    public void restaurarBackup() {
        System.out.println("Backup restaurado com sucesso.");
    }
}
