package voce.aluga.controller;

import voce.aluga.model.Administrador;
import voce.aluga.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping
    public Administrador criarAdministrador(@RequestBody Administrador admin) {
        return administradorService.salvar(admin);
    }

    @GetMapping
    public List<Administrador> listarTodos() {
        return administradorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Administrador> buscarPorId(@PathVariable int id) {
        return administradorService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletarAdministrador(@PathVariable int id) {
        administradorService.deletar(id);
    }
}
                                              