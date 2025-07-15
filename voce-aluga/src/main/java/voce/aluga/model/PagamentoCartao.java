package voce.aluga.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class PagamentoCartao extends Pagamento {

    @Column(nullable = false)
    private String tipoCartao; 

    @Column(nullable = false)
    private String numeroCartao; 

    @Column(nullable = false)
    private String titular;

    @Column(nullable = false)
    private String bandeira;

    @Column(nullable = false)
    private LocalDate validade;

    @Column(nullable = false)
    private String codigoSeguranca; 

    @Column
    private int parcelas;

    public boolean processarPagamento(float valor) {
        if (valor > 0 && this.validade.isAfter(LocalDate.now())) {
            this.setValor(valor);
            this.setStatus("pago");
            return true;
        }
        return false;
    }

    public String getTipoCartao() {
        return tipoCartao;
    }

    public void setTipoCartao(String tipoCartao) {
        this.tipoCartao = tipoCartao;
    }

    public String getNumeroCartao() {
        return numeroCartao;
    }

    public void setNumeroCartao(String numeroCartao) {
        this.numeroCartao = numeroCartao;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getBandeira() {
        return bandeira;
    }

    public void setBandeira(String bandeira) {
        this.bandeira = bandeira;
    }

    public LocalDate getValidade() {
        return validade;
    }

    public void setValidade(LocalDate validade) {
        this.validade = validade;
    }

    public String getCodigoSeguranca() {
        return codigoSeguranca;
    }

    public void setCodigoSeguranca(String codigoSeguranca) {
        this.codigoSeguranca = codigoSeguranca;
    }

    public int getParcelas() {
        return parcelas;
    }

    public void setParcelas(int parcelas) {
        this.parcelas = parcelas;
    }
}
