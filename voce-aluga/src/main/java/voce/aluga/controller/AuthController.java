package voce.aluga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import voce.aluga.model.Usuario;
import voce.aluga.service.UsuarioService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("🔐 POST /auth/login - Tentativa de login: " + loginRequest.getEmail());
        
        try {
            Usuario usuario = usuarioService.autenticar(loginRequest.getEmail(), loginRequest.getPassword());
            
            if (usuario != null) {
                Map<String, Object> response = new HashMap<>();
                Map<String, Object> userMap = new HashMap<>();
                
                userMap.put("id", usuario.getId());
                userMap.put("email", usuario.getEmail());
                userMap.put("name", usuario.getNome());
                userMap.put("role", usuario.getTipo());
                
                response.put("user", userMap);
                response.put("token", "fake-jwt-token"); // Em produção, gerar JWT real
                
                System.out.println("✅ Login bem-sucedido para: " + usuario.getNome() + " (" + usuario.getTipo() + ")");
                return ResponseEntity.ok(response);
            } else {
                System.out.println("❌ Credenciais inválidas para: " + loginRequest.getEmail());
                Map<String, String> error = new HashMap<>();
                error.put("message", "Credenciais inválidas");
                return ResponseEntity.status(401).body(error);
            }
        } catch (Exception e) {
            System.out.println("❌ Erro no login: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erro interno do servidor");
            return ResponseEntity.status(500).body(error);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        // Em produção, extrair usuário do JWT token
        Map<String, String> response = new HashMap<>();
        response.put("message", "Endpoint para verificar usuário logado");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status")
    public ResponseEntity<?> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "online");
        response.put("message", "VOCÊ ALUGA - Backend Java está rodando!");
        response.put("database", "MySQL");
        response.put("port", "8081");
        return ResponseEntity.ok(response);
    }

    // Classe interna para request
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
