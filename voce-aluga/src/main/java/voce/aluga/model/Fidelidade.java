package voce.aluga.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Fidelidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dataCadastro;

    @Column(nullable = false)
    private int pontuacao;

    @Column(nullable = false, length = 20)
    private String nivel;

    public int consultarSaldo() {
        return this.pontuacao;
    }

    public void adicionarPontos(int pontos) {
        this.pontuacao += pontos;
    }

    public void usarPontos() {
        this.pontuacao = 0;
    }

    public int getId() { 
        return id; 
    }

    public Date getDataCadastro() { 
        return dataCadastro; 
    }
    public void setDataCadastro(Date dataCadastro) { 
        this.dataCadastro = dataCadastro; 
    }

    public int getPontuacao() { 
        return pontuacao; 
    }
    public void setPontuacao(int pontuacao) { 
        this.pontuacao = pontuacao; }

    public String getNivel() { 
        return nivel; 
    }
    public void setNivel(String nivel) { 
        this.nivel = nivel; 
    }
}
