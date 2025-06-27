package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class Devolucao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int veiculoId;
    private int reservaId;
    private String status;
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

