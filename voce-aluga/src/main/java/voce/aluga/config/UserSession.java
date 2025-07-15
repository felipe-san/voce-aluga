package voce.aluga.config;

import org.springframework.stereotype.Component;

import voce.aluga.model.Usuario;

@Component
public class UserSession {
    private Usuario usuario;
    private boolean authenticated = false;

    public void login(Usuario usuario) {
        this.usuario = usuario;
        this.authenticated = true;
    }

    public void logout() {
        this.usuario = null;
        this.authenticated = false;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }
}
