package voce.aluga.controller;

import voce.aluga.config.UserSession;
import voce.aluga.model.Cliente;
import voce.aluga.model.Usuario;
import voce.aluga.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UserSession userSession;

    @GetMapping("/login")
    public String exibirFormularioLogin(Model model) {
        model.addAttribute("usuario", new Cliente());
        return "usuario/loginUsuario";
    }

    @PostMapping("/login")
    public String processarLogin(
            @RequestParam String email,
            @RequestParam String senha,
            @RequestParam(required = false) String returnUrl,
            @RequestParam(required = false) Integer usuarios,
            RedirectAttributes ra) {
        try {
            Usuario usuario = usuarioService.login(email);
            userSession.login(usuario);

            if (returnUrl != null && !returnUrl.isEmpty()) {
                String redirectUrl = returnUrl;
                if (usuarios != null) {
                    redirectUrl += "?usuarios=" + usuarios;
                }
                return "redirect:" + redirectUrl;
            }

            return "redirect:/web/paginaInicial";

        } catch (Exception e) {
            ra.addFlashAttribute("mensagemErro", "Email ou senha inválidos.");
            return "redirect:/web/usuarios/login";
        }
    }

    @PostMapping("/usuario")
    public Object criarUsuario(@RequestBody Usuario usuario) {
        try {
            return usuarioService.salvar(usuario);
        } catch (Exception e) {
            return "Erro ao criar usuário: " + e.getMessage();
        }
    }

    @GetMapping("/logout")
    public String logout() {
        userSession.logout();
        return "redirect:/web/paginaInicial";
    }

    @GetMapping("/usuario/lista")
    public Object listarUsuarios() {
        try {
            return usuarioService.listarTodos();
        } catch (Exception e) {
            return "Erro ao listar usuários: " + e.getMessage();
        }
    }

    @GetMapping("/usuario/{id}")
    public Object buscarPorId(@PathVariable Long id) {
        try {
            return usuarioService.buscarPorId(id);
        } catch (Exception e) {
            return "Erro ao buscar usuário: " + e.getMessage();
        }
    }

    @DeleteMapping("/usuario/delete/{id}")
    public String deletarUsuario(@PathVariable Long id) {
        try {
            usuarioService.deletar(id);
            return "Usuário deletado com sucesso.";
        } catch (Exception e) {
            return "Erro ao deletar usuário: " + e.getMessage();
        }
    }
}
