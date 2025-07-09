package voce.aluga.testes;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import voce.aluga.model.Reserva;
import voce.aluga.repository.ReservaRepository;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ReservaTests {

    @Autowired
    private ReservaRepository reservaRepository;

    @Test
    void testeSalvarReserva() {
        Reserva reserva = new Reserva();
        reserva.setClienteId(1);
        reserva.setContratoId(101);
        reserva.setDataInicio(new Date());
        reserva.setDataFim(new Date());
        reserva.setValorTotal(500f);
        reserva.setDescontoAplicado(50f);
        reserva.setFilialIdRetirada(1);
        reserva.setFilialIdDevolucao(2);
        reserva.setFormaPagamento("Cartão");
        reserva.setSeguroContratado("Básico");
        reserva.setTarifasAplicadas(30f);
        reserva.setStatus("pendente");

        Reserva salva = reservaRepository.save(reserva);
        assertThat(salva).isNotNull();
        assertThat(salva.getId()).isGreaterThan(0);
    }

    @Test
    void testeConfirmarReserva() {
        Reserva reserva = new Reserva();
        reserva.setStatus("pendente");
        reserva = reservaRepository.save(reserva);

        reserva.confirmarReserva();
        reserva = reservaRepository.save(reserva);

        assertThat(reserva.getStatus()).isEqualTo("confirmada");
    }

    @Test
    void testeAplicarDescontoFidelidade() {
        Reserva reserva = new Reserva();
        float desconto = reserva.aplicarDescontoFidelidade(20); // 20 * 0.5 = 10
        assertThat(desconto).isEqualTo(10f);
        assertThat(reserva.getDescontoAplicado()).isEqualTo(10f);
    }

    @Test
    void testeCalcularValorTotal() {
        Reserva reserva = new Reserva();
        reserva.setTarifasAplicadas(50f);
        reserva.setDescontoAplicado(20f);

        reserva.calcularValorReserva(5, 100f); // 5 dias * R$100 + R$50 - R$20 = R$530

        assertThat(reserva.getValorTotal()).isEqualTo(530f);
    }
}
