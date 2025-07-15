package voce.aluga.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Transferencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer veiculoId;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date inicioTransferencia;

    @Temporal(TemporalType.DATE)
    private Date finalTransferencia;

    @Column(nullable = false)
    private Integer filialOrigemId;

    @Column(nullable = false)
    private Integer filialDestinoId;

    @Column(nullable = false)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String anotacoes;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(Integer veiculoId) {
        this.veiculoId = veiculoId;
    }

    public Date getInicioTransferencia() {
        return inicioTransferencia;
    }

    public void setInicioTransferencia(Date inicioTransferencia) {
        this.inicioTransferencia = inicioTransferencia;
    }

    public Date getFinalTransferencia() {
        return finalTransferencia;
    }

    public void setFinalTransferencia(Date finalTransferencia) {
        this.finalTransferencia = finalTransferencia;
    }

    public Integer getFilialOrigemId() {
        return filialOrigemId;
    }

    public void setFilialOrigemId(Integer filialOrigemId) {
        this.filialOrigemId = filialOrigemId;
    }

    public Integer getFilialDestinoId() {
        return filialDestinoId;
    }

    public void setFilialDestinoId(Integer filialDestinoId) {
        this.filialDestinoId = filialDestinoId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAnotacoes() {
        return anotacoes;
    }

    public void setAnotacoes(String anotacoes) {
        this.anotacoes = anotacoes;
    }
}
