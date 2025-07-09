package voce.aluga.testes;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import voce.aluga.model.Devolucao;
import voce.aluga.repository.DevolucaoRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class DevolucaoTests {

    @Autowired
    private DevolucaoRepository devolucaoRepository;

    @Test
    void testeSalvarDevolucaoSemAvarias() {
        Devolucao devolucao = new Devolucao();
        devolucao.setVeiculoId(1);
        devolucao.setReservaId(100);
        devolucao.setStatus("concluída");
        devolucao.setAvarias(false);
        devolucao.setAnotacoes("Veículo devolvido em perfeito estado.");

        Devolucao salva = devolucaoRepository.save(devolucao);

        assertThat(salva).isNotNull();
        assertThat(salva.getId()).isGreaterThan(0);
        assertThat(salva.isAvarias()).isFalse();
    }

    @Test
    void testeSalvarDevolucaoComAvarias() {
        Devolucao devolucao = new Devolucao();
        devolucao.setVeiculoId(2);
        devolucao.setReservaId(101);
        devolucao.setStatus("com avarias");
        devolucao.setAvarias(true);
        devolucao.setAnotacoes("Risco no para-choque e amassado na porta.");

        Devolucao salva = devolucaoRepository.save(devolucao);

        assertThat(salva).isNotNull();
        assertThat(salva.getAnotacoes()).contains("Risco");
        assertThat(salva.isAvarias()).isTrue();
    }

    @Test
    void testeVerificarAvariasComAvarias() {
        Devolucao devolucao = new Devolucao();
        devolucao.setVeiculoId(3);
        devolucao.setReservaId(102);
        devolucao.setStatus("com avarias");
        devolucao.setAvarias(true);
        devolucao.setAnotacoes("Retrovisor quebrado.");

        Devolucao salva = devolucaoRepository.save(devolucao);

        String resultado = salva.verificarAvarias();
        assertThat(resultado).contains("Avarias encontradas");
        assertThat(resultado).contains("Retrovisor quebrado");
    }

    @Test
    void testeVerificarAvariasSemAvarias() {
        Devolucao devolucao = new Devolucao();
        devolucao.setVeiculoId(4);
        devolucao.setReservaId(103);
        devolucao.setStatus("concluída");
        devolucao.setAvarias(false);
        devolucao.setAnotacoes("Sem observações.");

        Devolucao salva = devolucaoRepository.save(devolucao);

        String resultado = salva.verificarAvarias();
        assertThat(resultado).isEqualTo("Sem avarias.");
    }

    @Test
    void testeBuscarDevolucaoPorId() {
        Devolucao devolucao = new Devolucao();
        devolucao.setVeiculoId(5);
        devolucao.setReservaId(104);
        devolucao.setStatus("pendente");
        devolucao.setAvarias(false);
        devolucao.setAnotacoes("Aguardando inspeção.");

        Devolucao salva = devolucaoRepository.save(devolucao);

        Optional<Devolucao> encontrada = devolucaoRepository.findById(salva.getId());
        assertThat(encontrada).isPresent();
        assertThat(encontrada.get().getStatus()).isEqualTo("pendente");
    }

    @Test
    void testeDeletarDevolucao() {
        Devolucao devolucao = new Devolucao();
        devolucao.setVeiculoId(6);
        devolucao.setReservaId(105);
        devolucao.setStatus("pendente");
        devolucao.setAvarias(false);
        devolucao.setAnotacoes("Nenhuma observação.");

        Devolucao salva = devolucaoRepository.save(devolucao);
        int id = salva.getId();

        devolucaoRepository.deleteById(id);

        Optional<Devolucao> excluida = devolucaoRepository.findById(id);
        assertThat(excluida).isNotPresent();
    }
}
