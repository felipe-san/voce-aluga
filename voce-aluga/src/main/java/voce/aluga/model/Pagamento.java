package voce.aluga.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer reservaId;

    @Column(nullable = false)
    private LocalDate dataPagamento;

    @Column(nullable = false)
    private Float valor;

    @Column(nullable = false)
    private String formaPagamento;

    @Column
    private String comprovante;

    @Column(nullable = false)
    private String status; 


    public boolean finalizarPagamento() {
        if (!"pago".equalsIgnoreCase(this.status)) {
            this.status = "pago";
            return true;
        }
        return false;
    }

    public boolean cancelarPagamento() {
        if (!"cancelado".equalsIgnoreCase(this.status)) {
            this.status = "cancelado";
            return true;
        }
        return false;
    }

    public String gerarComprovante() {
        return "Comprovante: Pagamento ID " + this.id + ", valor: R$ " + this.valor + ", forma: " + this.formaPagamento;
    }

    public void solicitarPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
        this.status = "pendente";
    }

    public void atualizarReserva() {
        
    }

    public void atualizarPagamento(String novoStatus) {
        this.status = novoStatus;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getReservaId() {
        return reservaId;
    }

    public void setReservaId(Integer reservaId) {
        this.reservaId = reservaId;
    }

    public LocalDate getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public Float getValor() {
        return valor;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public String getComprovante() {
        return comprovante;
    }

    public void setComprovante(String comprovante) {
        this.comprovante = comprovante;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

