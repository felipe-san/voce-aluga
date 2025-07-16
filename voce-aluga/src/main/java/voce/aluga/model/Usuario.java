package voce.aluga.model;

import javax.persistence.*;

@Entity
@Table(name = "USUARIO")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String endereco;
    private String email;
    private String senha;
    private String tipo; // "admin" ou "cliente"
    private String cpf;
    private String telefone;
    
    @Column(name = "CNH")
    private String cnh;

    public Usuario() {}

    public Usuario(String nome, String endereco, String email, String senha, String tipo) {
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }

    // Getters e Setters
    public Long getId() {
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getNome() { 
        return nome; 
    }
    public void setNome(String nome) { 
        this.nome = nome; 
    }

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

    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCnh() {
        return cnh;
    }
    public void setCnh(String cnh) {
        this.cnh = cnh;
    }
}
