package voce.aluga.controller;

import voce.aluga.model.Administrador;
import voce.aluga.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/administradores")
public class AdministradorController extends UsuarioController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping("/administrador/criar")
    public Object criarAdministrador(@RequestBody Administrador admin) {
        try {
            return administradorService.salvar(admin);
        } catch (Exception e) {
            return "Erro ao criar administrador: " + e.getMessage();
        }
    }

    @GetMapping("/administrador/listar")
    public List<Administrador> listarTodos() {
        try {
            return administradorService.listarTodos();
        } catch (Exception e) {
            System.out.println("Erro ao listar administradores: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @GetMapping("/administrador/buscar/{id}")
    public Object buscarPorId(@PathVariable int id) {
        try {
            return administradorService.buscarPorId(id);         
        } catch (Exception e) {
            return "Erro ao buscar administrador: " + e.getMessage();
        }
    }

    @DeleteMapping("/administrador/deletar/{id}")
    public String deletarAdministrador(@PathVariable int id, RedirectAttributes ra) {
        try {
            administradorService.deletar(id);
            ra.addFlashAttribute("mensagem", "Administrador excluído com sucesso!");
            ra.addFlashAttribute("tipoMensagem", "success");
        } catch (Exception e) {
            ra.addFlashAttribute("mensagem", "Erro ao excluir administrador: " + e.getMessage());
            ra.addFlashAttribute("tipoMensagem", "error");
        }
        return "redirect:/web/administracao/administrador/lista";
    }
}
