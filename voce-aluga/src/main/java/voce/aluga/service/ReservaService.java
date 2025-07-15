package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Reserva;
import voce.aluga.repository.ReservaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public Reserva salvar(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public Optional<Reserva> buscarPorId(int id) {
        return reservaRepository.findById(id);
    }

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public void deletar(int id) {
        reservaRepository.deleteById(id);
    }

    public Reserva confirmarReserva(Reserva reserva) {
        reserva.confirmarReserva();
        return reservaRepository.save(reserva);
    }

    public Reserva cancelarReserva(Reserva reserva) {
        reserva.cancelarReserva();
        return reservaRepository.save(reserva);
    }
}
