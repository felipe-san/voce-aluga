package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Cliente;
import voce.aluga.service.ClienteService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController extends UsuarioController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/cliente/cadastrar")
    public String cadastrarCliente(@ModelAttribute Cliente cliente, Model model) {
        try {
            Cliente novoCliente = clienteService.salvar(cliente);
            model.addAttribute("mensagem", "Cadastro realizado com sucesso!");
            model.addAttribute("cadastroSucesso", true);
            return "cliente/areaCadastroCliente";
        } catch (Exception e) {
            model.addAttribute("mensagem", "Erro ao cadastrar cliente: " + e.getMessage());
            model.addAttribute("cadastroSucesso", false);
            return "cliente/areaCadastroCliente";
        }
    }

    @GetMapping("/cliente/lista")
    public List<Cliente> listarTodos() {
        try {
            return clienteService.listarTodos();
        } catch (Exception e) {
            System.out.println("Erro ao listar clientes: " + e.getMessage());
            return new ArrayList<>(); 
        }
    }

    @GetMapping("/cliente/{id}")
    public Object buscarPorId(@PathVariable int id) {
        try {
            Optional<Cliente> cliente = clienteService.buscarPorId(id);
            return cliente;
        } catch (Exception e) {
            return "Erro ao buscar cliente: " + e.getMessage();
        }
    }

    @DeleteMapping("/cliente/deletar/{id}")
    public String deletarCliente(@PathVariable int id) {
        try {
            clienteService.deletar(id);
            return "Cliente deletado com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar cliente: " + e.getMessage();
        }
    }
}
