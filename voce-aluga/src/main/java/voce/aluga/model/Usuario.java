package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String endereco;
    private String email;

    public Usuario() {}

    public Usuario(String nome, String endereco, String email) {
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
    }

    public Long getId() {
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; }

    public String getNome() { 
        return nome; 
    }

    public void setNome(String nome) { 
        this.nome = nome; }

    public String getEndereco() { 
        return endereco; 
    }

    public void setEndereco(String endereco) { 
        this.endereco = endereco; 
    }

    public String getEmail() { 
        return email; 
    }
    public void setEmail(String email) { 
        this.email = email; 
    }
}
