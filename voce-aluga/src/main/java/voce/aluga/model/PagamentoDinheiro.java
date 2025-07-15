package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class PagamentoDinheiro extends Pagamento {

    @Column(nullable = false)
    private Float valorRecebido;

    @Column
    private Float troco;

    public String calcularNota() {
        return "Nota de pagamento em dinheiro: R$ " + this.getValor()
             + "\nValor Recebido: R$ " + valorRecebido
             + "\nTroco: R$ " + troco;
    }

    public void validarNota() {
        if (valorRecebido >= this.getValor()) {
            this.troco = valorRecebido - this.getValor();
            this.setStatus("pago");
        } else {
            throw new IllegalArgumentException("Valor recebido é menor que o valor da compra.");
        }
    }

    public Float getValorRecebido() {
        return valorRecebido;
    }

    public void setValorRecebido(Float valorRecebido) {
        this.valorRecebido = valorRecebido;
    }

    public Float getTroco() {
        return troco;
    }

    public void setTroco(Float troco) {
        this.troco = troco;
    }
}

