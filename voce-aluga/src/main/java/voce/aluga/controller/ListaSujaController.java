package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.ListaSuja;
import voce.aluga.service.ListaSujaService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lista-suja")
public class ListaSujaController {

    @Autowired
    private ListaSujaService listaSujaService;

    @PostMapping("/adicionar")
    public Object adicionarCliente(@RequestBody ListaSuja entrada) {
        try {
            return listaSujaService.adicionarCliente(entrada);
        } catch (Exception e) {
            return "Erro ao adicionar cliente à lista suja: " + e.getMessage();
        }
    }

    @PostMapping("/remover/{idCliente}")
    public Object removerCliente(@PathVariable int idCliente) {
        try {
            ListaSuja removido = listaSujaService.removerCliente(idCliente);
            if (removido != null) {
                return "Cliente removido da lista suja com sucesso.";
            }
            return "Cliente não encontrado na lista suja.";
        } catch (Exception e) {
            return "Erro ao remover cliente da lista suja: " + e.getMessage();
        }
    }

  @GetMapping("/verificar/{idCliente}")
public Object verificarCliente(@PathVariable int idCliente) {
    try {
        Optional<ListaSuja> cliente = listaSujaService.verificarCliente(idCliente);
        if (cliente.isPresent()) {
            return cliente.get();
        } else {
            return "Cliente não está na lista suja.";
        }
    } catch (Exception e) {
        return "Erro ao verificar cliente na lista suja: " + e.getMessage();
    }
}


    @GetMapping("/listar")
    public List<ListaSuja> listarTodos() {
        try {
            return listaSujaService.listarTodos();
        } catch (Exception e) {
            System.out.println("Erro ao listar registros da lista suja: " + e.getMessage());
            return new ArrayList<>();
        }
    }
}
