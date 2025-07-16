package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Cliente;
import voce.aluga.service.ClienteService;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    // POST: cadastrar cliente
    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
        return clienteService.salvar(cliente);
    }

    // GET: listar todos os clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteService.listarTodos();
    }

    // GET: buscar cliente por ID
    @GetMapping("/{id}")
    public Optional<Cliente> visualizarCliente(@PathVariable int id) {
        return clienteService.buscarPorId(id);
    }

    // DELETE: deletar cliente por ID
    @DeleteMapping("/{id}")
    public String deletarCliente(@PathVariable int id) {
        try {
            clienteService.deletar(id);
            return "Cliente deletado com sucesso";
        } catch (Exception e) {
            return "Erro ao deletar: " + e.getMessage();
        }
    }
}
