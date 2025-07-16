package voce.aluga.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "VEICULO")
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelo;
    private String placa;
    private Integer ano;
    private String status;
    private BigDecimal quilometragem;
    private BigDecimal capacidadeTanque;
    
    @Temporal(TemporalType.DATE)
    private Date dataProximaManutencao;
    
    private BigDecimal consumoMedio;
    
    @Column(name = "grupoVeiculo")
    private Integer grupoVeiculo;
    
    @Column(name = "filialId")
    private Integer filialId;

    // Campos adicionais para compatibilidade com frontend
    private String marca;
    private String cor;
    private String categoria;
    private BigDecimal preco_diario;
    private Integer km_atual;

    public Veiculo() {}

    // Getters e Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getPlaca() {
        return placa;
    }
    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Integer getAno() {
        return ano;
    }
    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getQuilometragem() {
        return quilometragem;
    }
    public void setQuilometragem(BigDecimal quilometragem) {
        this.quilometragem = quilometragem;
    }

    public BigDecimal getCapacidadeTanque() {
        return capacidadeTanque;
    }
    public void setCapacidadeTanque(BigDecimal capacidadeTanque) {
        this.capacidadeTanque = capacidadeTanque;
    }

    public Date getDataProximaManutencao() {
        return dataProximaManutencao;
    }
    public void setDataProximaManutencao(Date dataProximaManutencao) {
        this.dataProximaManutencao = dataProximaManutencao;
    }

    public BigDecimal getConsumoMedio() {
        return consumoMedio;
    }
    public void setConsumoMedio(BigDecimal consumoMedio) {
        this.consumoMedio = consumoMedio;
    }

    public Integer getGrupoVeiculo() {
        return grupoVeiculo;
    }
    public void setGrupoVeiculo(Integer grupoVeiculo) {
        this.grupoVeiculo = grupoVeiculo;
    }

    public Integer getFilialId() {
        return filialId;
    }
    public void setFilialId(Integer filialId) {
        this.filialId = filialId;
    }

    public String getMarca() {
        return marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCor() {
        return cor;
    }
    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public BigDecimal getPreco_diario() {
        return preco_diario;
    }
    public void setPreco_diario(BigDecimal preco_diario) {
        this.preco_diario = preco_diario;
    }

    public Integer getKm_atual() {
        return km_atual;
    }
    public void setKm_atual(Integer km_atual) {
        this.km_atual = km_atual;
    }
}
