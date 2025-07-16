package voce.aluga.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Contrato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int clienteId;
    private int veiculoId;

    @Temporal(TemporalType.DATE)
    private Date dataInicio;

    @Temporal(TemporalType.DATE)
    private Date dataFim;

    @Temporal(TemporalType.DATE)
    private Date dataAssinatura;
    
    private float valor;
    private float valorTotal;

    @Column(columnDefinition = "TEXT")
    private String termos;
    private String status;
    private float desconto;

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClienteId() {
        return clienteId;
    }

    public void setClienteId(int clienteId) {
        this.clienteId = clienteId;
    }

    public int getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(int veiculoId) {
        this.veiculoId = veiculoId;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataFim() {
        return dataFim;
    }

    public void setDataFim(Date dataFim) {
        this.dataFim = dataFim;
    }

    public Date getDataAssinatura() {
        return dataAssinatura;
    }

    public void setDataAssinatura(Date dataAssinatura) {
        this.dataAssinatura = dataAssinatura;
    }

    public float getValor() {
        return valor;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public float getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(float valorTotal) {
        this.valorTotal = valorTotal;
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

    public float getDesconto() {
        return desconto;
    }

    public void setDesconto(float desconto) {
        this.desconto = desconto;
    }

    // Métodos de negócio
    public String gerarContrato() {
        return "Contrato ID: " + id + "\nAssinado em: " + dataAssinatura + "\nValor: R$" + valor + "\nStatus: " + status + "\nTermos:\n" + termos;
    }

    public float calcularContrato() {
        return valor;
    }

    public float aplicarDescontos(float desconto) {
        this.desconto = desconto;
        this.valorTotal = valor - desconto;
        return valorTotal;
    }

    public void encerrarContrato() {
        this.status = "ENCERRADO";
    }
}
