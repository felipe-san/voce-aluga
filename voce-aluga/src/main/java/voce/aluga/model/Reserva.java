package voce.aluga.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int clienteId;
    private int contratoId;

    @Temporal(TemporalType.DATE)
    private Date dataInicio;

    @Temporal(TemporalType.DATE)
    private Date dataFim;

    private float valorTotal;
    private float descontoAplicado;
    private int filialIdRetirada;
    private int filialIdDevolucao;
    private String formaPagamento;
    private String seguroContratado;
    private float tarifasAplicadas;
    private String status;

    public void confirmarReserva() {
        this.status = "confirmada";
    }

    public void cancelarReserva() {
        this.status = "cancelada";
    }

    public float aplicarDescontoFidelidade(int pontosFidelidade) {
        float desconto = pontosFidelidade * 0.5f;
        this.descontoAplicado = desconto;
        return desconto;
    }

    public void calcularValorReserva(int dias, float precoDiaria) {
        this.valorTotal = dias * precoDiaria + this.tarifasAplicadas - this.descontoAplicado;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getClienteId() { return clienteId; }
    public void setClienteId(int clienteId) { this.clienteId = clienteId; }

    public int getContratoId() { return contratoId; }
    public void setContratoId(int contratoId) { this.contratoId = contratoId; }

    public Date getDataInicio() { return dataInicio; }
    public void setDataInicio(Date dataInicio) { this.dataInicio = dataInicio; }

    public Date getDataFim() { return dataFim; }
    public void setDataFim(Date dataFim) { this.dataFim = dataFim; }

    public float getValorTotal() { return valorTotal; }
    public void setValorTotal(float valorTotal) { this.valorTotal = valorTotal; }

    public float getDescontoAplicado() { return descontoAplicado; }
    public void setDescontoAplicado(float descontoAplicado) { this.descontoAplicado = descontoAplicado; }

    public int getFilialIdRetirada() { return filialIdRetirada; }
    public void setFilialIdRetirada(int filialIdRetirada) { this.filialIdRetirada = filialIdRetirada; }

    public int getFilialIdDevolucao() { return filialIdDevolucao; }
    public void setFilialIdDevolucao(int filialIdDevolucao) { this.filialIdDevolucao = filialIdDevolucao; }

    public String getFormaPagamento() { return formaPagamento; }
    public void setFormaPagamento(String formaPagamento) { this.formaPagamento = formaPagamento; }

    public String getSeguroContratado() { return seguroContratado; }
    public void setSeguroContratado(String seguroContratado) { this.seguroContratado = seguroContratado; }

    public float getTarifasAplicadas() { return tarifasAplicadas; }
    public void setTarifasAplicadas(float tarifasAplicadas) { this.tarifasAplicadas = tarifasAplicadas; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
