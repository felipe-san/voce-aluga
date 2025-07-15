package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class Devolucao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 50) 
    private int veiculoId;

    @Column(length = 50) 
    private int reservaId;

    @Column(nullable = false, length = 50) 
    private String status;

    @Column(length = 50) 
    private boolean avarias;

    @Column(columnDefinition = "TEXT")
    private String anotacoes;

    public int getId() {
        return id;
    }

    public int getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(int veiculoId) {
        this.veiculoId = veiculoId;
    }

    public int getReservaId() {
        return reservaId;
    }

    public void setReservaId(int reservaId) {
        this.reservaId = reservaId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isAvarias() {
        return avarias;
    }

    public void setAvarias(boolean avarias) {
        this.avarias = avarias;
    }

    public String getAnotacoes() {
        return anotacoes;
    }

    public void setAnotacoes(String anotacoes) {
        this.anotacoes = anotacoes;
    }

    public String verificarAvarias() {
        if (this.avarias) {
            return "Avarias encontradas: " + this.anotacoes;
        } else {
            return "Sem avarias.";
        }
    }
}

