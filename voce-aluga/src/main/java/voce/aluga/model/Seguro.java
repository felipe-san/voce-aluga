package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class Seguro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String tipoSeguro;

    @Column(nullable = false)
    private Float valor;

    @Column(nullable = false)
    private String cobertura;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    public void calcularSeguro() {
        switch (tipoSeguro.toLowerCase()) {
            case "básico":
                this.valor = 300f;
                break;
            case "completo":
                this.valor = 500f;
                break;
            case "com franquia reduzida":
                this.valor = 700f;
                break;
            default:
                this.valor = 400f;
        }
    }

    public void validarSeguro() {
        if (tipoSeguro == null || tipoSeguro.isEmpty()) {
            throw new IllegalArgumentException("Tipo de seguro inválido.");
        }
        if (valor == null || valor <= 0) {
            throw new IllegalArgumentException("Valor do seguro inválido.");
        }
        if (cobertura == null || cobertura.isEmpty()) {
            throw new IllegalArgumentException("Cobertura inválida.");
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipoSeguro() {
        return tipoSeguro;
    }

    public void setTipoSeguro(String tipoSeguro) {
        this.tipoSeguro = tipoSeguro;
    }

    public Float getValor() {
        return valor;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public String getCobertura() {
        return cobertura;
    }

    public void setCobertura(String cobertura) {
        this.cobertura = cobertura;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
