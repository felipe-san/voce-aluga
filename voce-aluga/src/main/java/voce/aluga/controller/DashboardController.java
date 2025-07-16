package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import voce.aluga.service.*;
import voce.aluga.model.Veiculo;
import voce.aluga.model.Cliente;
import voce.aluga.model.Contrato;

import java.util.*;
import java.math.BigDecimal;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private VeiculoService veiculoService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ContratoService contratoService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        try {
            // Buscar dados reais do banco
            List<Veiculo> todosVeiculos = veiculoService.listarTodos();
            List<Cliente> todosClientes = clienteService.listarTodos();
            List<Contrato> todosContratos = contratoService.listarTodos();

            // Calcular estatísticas dos veículos
            long totalVeiculos = todosVeiculos.size();
            long veiculosDisponiveis = todosVeiculos.stream()
                .filter(v -> "disponivel".equalsIgnoreCase(v.getStatus()))
                .count();
            long veiculosAlugados = todosVeiculos.stream()
                .filter(v -> "alugado".equalsIgnoreCase(v.getStatus()))
                .count();
            long veiculosManutencao = todosVeiculos.stream()
                .filter(v -> "manutencao".equalsIgnoreCase(v.getStatus()))
                .count();

            // Calcular estatísticas dos contratos
            long contratosAtivos = todosContratos.size(); // Considerar todos os contratos como ativos por enquanto

            // Calcular receita baseada em todos os contratos
            BigDecimal receitaMensal = todosContratos.stream()
                .map(c -> c.getValorTotal() > 0 ? BigDecimal.valueOf(c.getValorTotal()) : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            // Preparar resposta
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalVeiculos", totalVeiculos);
            stats.put("veiculosDisponiveis", veiculosDisponiveis);
            stats.put("veiculosAlugados", veiculosAlugados);
            stats.put("veiculosManutencao", veiculosManutencao);
            stats.put("totalClientes", todosClientes.size());
            stats.put("contratosAtivos", contratosAtivos);
            stats.put("receitaMensal", receitaMensal.doubleValue());
            stats.put("crescimentoMensal", 12.5); // Simulado por enquanto

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("error", "Erro ao buscar estatísticas"));
        }
    }

    @GetMapping("/recent-activity")
    public ResponseEntity<List<Map<String, Object>>> getRecentActivity() {
        try {
            List<Map<String, Object>> activities = new ArrayList<>();
            
            // Buscar contratos recentes
            List<Contrato> contratosRecentes = contratoService.listarTodos();
            
            // Simular atividades baseadas nos dados reais
            for (int i = 0; i < Math.min(5, contratosRecentes.size()); i++) {
                Contrato contrato = contratosRecentes.get(i);
                Map<String, Object> activity = new HashMap<>();
                activity.put("id", contrato.getId());
                activity.put("action", "Contrato");
                activity.put("cliente", "Cliente ID: " + contrato.getClienteId());
                activity.put("veiculo", "Veículo ID: " + contrato.getVeiculoId());
                activity.put("time", (i + 1) + " dia(s) atrás");
                activities.add(activity);
            }

            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ArrayList<>());
        }
    }

    @GetMapping("/alerts")
    public ResponseEntity<List<Map<String, Object>>> getAlerts() {
        try {
            List<Map<String, Object>> alerts = new ArrayList<>();
            
            // Verificar veículos em manutenção
            List<Veiculo> veiculosManutencao = veiculoService.listarTodos().stream()
                .filter(v -> "manutencao".equalsIgnoreCase(v.getStatus()))
                .collect(Collectors.toList());

            if (!veiculosManutencao.isEmpty()) {
                Map<String, Object> alert = new HashMap<>();
                alert.put("id", 1);
                alert.put("type", "warning");
                alert.put("message", veiculosManutencao.size() + " veículo(s) em manutenção");
                alerts.add(alert);
            }

            // Verificar taxa de ocupação
            List<Veiculo> todosVeiculos = veiculoService.listarTodos();
            long veiculosDisponiveis = todosVeiculos.stream()
                .filter(v -> "disponivel".equalsIgnoreCase(v.getStatus()))
                .count();
            
            double taxaOcupacao = ((double)(todosVeiculos.size() - veiculosDisponiveis) / todosVeiculos.size()) * 100;
            
            if (taxaOcupacao > 80) {
                Map<String, Object> alert = new HashMap<>();
                alert.put("id", 2);
                alert.put("type", "success");
                alert.put("message", "Alta ocupação da frota: " + String.format("%.1f", taxaOcupacao) + "%");
                alerts.add(alert);
            }

            return ResponseEntity.ok(alerts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ArrayList<>());
        }
    }
}
