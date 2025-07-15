package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class PagamentoPix extends Pagamento {

    @Column(nullable = false)
    private String chavePix;


    public String gerarQrCode() {
        return "QRCode: pix:chave=" + this.chavePix + "&valor=" + this.getValor();
    }

    public boolean confirmarPagamento() {
        if (!"pago".equalsIgnoreCase(this.getStatus())) {
            this.setStatus("pago");
            return true;
        }
        return false;
    }

    public boolean estornarPagamento() {
        if ("pago".equalsIgnoreCase(this.getStatus())) {
            this.setStatus("estornado");
            return true;
        }
        return false;
    }

    public String getChavePix() {
        return chavePix;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }
}
