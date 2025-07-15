package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class Tarifa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String tipoTarifa;

    @Column(nullable = false)
    private Float valor;

    @Column(columnDefinition = "TEXT")
    private String descricao;


    public float calcularTarifaAtraso(int diasAtraso) {
        if (!"atraso".equalsIgnoreCase(tipoTarifa)) return 0f;
        return valor * diasAtraso;
    }

    public float calcularTarifaAvarias(int nivelAvaria) {
        if (!"avaria".equalsIgnoreCase(tipoTarifa)) return 0f;
        return valor * nivelAvaria;
    }

    public float definirTarifaVeiculo(Veiculo veiculo) {
        if (veiculo.getGrupo() == null) return 0f;

        if ("econômico".equalsIgnoreCase(veiculo.getGrupo())) {
            return valor * 1.0f;
        } else if ("executivo".equalsIgnoreCase(veiculo.getGrupo())) {
            return valor * 1.5f;
        } else if ("suv".equalsIgnoreCase(veiculo.getGrupo())) {
            return valor * 2.0f;
        }
        return valor;
    }

    public static java.util.List<Tarifa> gerarRelatorioTarifas(java.util.List<Tarifa> tarifas) {

        return tarifas;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipoTarifa() {
        return tipoTarifa;
    }

    public void setTipoTarifa(String tipoTarifa) {
        this.tipoTarifa = tipoTarifa;
    }

    public Float getValor() {
        return valor;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}

