package voce.aluga.model;

import javax.persistence.*;

@Entity
public class EstoqueSimples {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private int veiculoId;
    private int quantidade;
    private String localizacao;

    // Getters e Setters
    public int getId() { 
        return id; 
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(int veiculoId) {
        this.veiculoId = veiculoId;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }
}
