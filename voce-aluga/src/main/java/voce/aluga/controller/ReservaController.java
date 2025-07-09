package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Reserva;
import voce.aluga.service.ReservaService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping("/cadastrar")
    public Object cadastrar(@RequestBody Reserva reserva) {
        try {
            return reservaService.salvar(reserva);
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar reserva: " + e.getMessage());
            return "Erro ao cadastrar reserva: " + e.getMessage();
        }
    }

    @GetMapping("/{id}")
    public Object buscar(@PathVariable int id) {
        try {
            Optional<Reserva> reserva = reservaService.buscarPorId(id);
            return reserva.isPresent() ? reserva : "Reserva não encontrada.";
        } catch (Exception e) {
            System.out.println("Erro ao buscar reserva: " + e.getMessage());
            return "Erro ao buscar reserva: " + e.getMessage();
        }
    }

    @GetMapping("/listar")
    public List<Reserva> listarTodas() {
        try {
            return reservaService.listarTodas();
        } catch (Exception e) {
            System.out.println("Erro ao listar reservas: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @DeleteMapping("/deletar/{id}")
    public String deletar(@PathVariable int id) {
        try {
            reservaService.deletar(id);
            return "Reserva deletada com sucesso.";
        } catch (Exception e) {
            System.out.println("Erro ao deletar reserva: " + e.getMessage());
            return "Erro ao deletar reserva: " + e.getMessage();
        }
    }

    @PostMapping("/confirmar")
    public Object confirmar(@RequestBody Reserva reserva) {
        try {
            return reservaService.confirmarReserva(reserva);
        } catch (Exception e) {
            System.out.println("Erro ao confirmar reserva: " + e.getMessage());
            return "Erro ao confirmar reserva: " + e.getMessage();
        }
    }

    @PostMapping("/cancelar")
    public Object cancelar(@RequestBody Reserva reserva) {
        try {
            return reservaService.cancelarReserva(reserva);
        } catch (Exception e) {
            System.out.println("Erro ao cancelar reserva: " + e.getMessage());
            return "Erro ao cancelar reserva: " + e.getMessage();
        }
    }
}
