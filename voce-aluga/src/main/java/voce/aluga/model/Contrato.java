package voce.aluga.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Contrato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Temporal(TemporalType.DATE)
    private Date dataAssinatura;
    private float valor;

    @Column(columnDefinition = "TEXT")
    private String termos;
    private String status;

    public int getId() {
        return id;
    }

    public Date getDataAssinatura() {
        return dataAssinatura;
    }

    public void setDataAssinatura(Date dataAssinatura) {
        this.dataAssinatura = dataAssinatura;
    }

    public void setId(int id) {
        this.id = id;
    }

    public float getValor() {
        return valor;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public String getTermos() {
        return termos;
    }

    public void setTermos(String termos) {
        this.termos = termos;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String gerarContrato() {
        return "Contrato ID: " + id + "\nAssinado em: " + dataAssinatura + "\nValor: R$" + valor + "\nStatus: " + status + "\nTermos:\n" + termos;
    }

    public float calcularContrato() {
        return valor;
    }

    public float aplicarDescontos(float desconto) {
        return valor - desconto;
    }

    public void encerrarContrato() {
        this.status = "finalizado";
    }
}
