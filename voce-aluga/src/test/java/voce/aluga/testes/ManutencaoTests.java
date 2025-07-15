package voce.aluga.testes;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import voce.aluga.model.Manutencao;
import voce.aluga.repository.ManutencaoRepository;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
public class ManutencaoTests {

    @Autowired
    private ManutencaoRepository manutencaoRepository;

    @Test
    void testeSalvarManutencao() {
        Manutencao m = new Manutencao();
        m.setVeiculoId(100);
        m.setTipoManutencao("preventiva");
        m.setDataInicio(new Date());
        m.setStatus("agendada");
        m.setAnotacoes("Troca de óleo e filtro");

        Manutencao salva = manutencaoRepository.save(m);
        assertThat(salva.getId()).isNotZero();
        assertThat(salva.getTipoManutencao()).isEqualTo("preventiva");
    }

    @Test
    void testeBuscarManutencao() {
        Manutencao m = new Manutencao();
        m.setVeiculoId(101);
        m.setTipoManutencao("revisao");
        m.setDataInicio(new Date());
        m.setStatus("em andamento");
        m.setAnotacoes("Revisão dos 10 mil km");

        Manutencao salva = manutencaoRepository.save(m);
        Manutencao encontrada = manutencaoRepository.findById(salva.getId()).orElse(null);

        assertThat(encontrada).isNotNull();
        assertThat(encontrada.getVeiculoId()).isEqualTo(101);
    }
}
