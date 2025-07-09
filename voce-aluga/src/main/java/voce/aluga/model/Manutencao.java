package voce.aluga.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Manutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int veiculoId;

    @Column(nullable = false, length = 50)
    private String tipoManutencao;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dataInicio;

    @Temporal(TemporalType.DATE)
    @Column(nullable = true)
    private Date dataFim;

    @Column(nullable = false, length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String anotacoes;

    public Date agendarManutencao(Date data, int veiculo) {
        this.veiculoId = veiculo;
        this.dataInicio = data;
        this.status = "agendada";
        return this.dataInicio;
    }

    public int getId() { return id; }
    public int getVeiculoId() { return veiculoId; }
    public void setVeiculoId(int veiculoId) { this.veiculoId = veiculoId; }
    public String getTipoManutencao() { return tipoManutencao; }
    public void setTipoManutencao(String tipoManutencao) { this.tipoManutencao = tipoManutencao; }
    public Date getDataInicio() { return dataInicio; }
    public void setDataInicio(Date dataInicio) { this.dataInicio = dataInicio; }
    public Date getDataFim() { return dataFim; }
    public void setDataFim(Date dataFim) { this.dataFim = dataFim; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAnotacoes() { return anotacoes; }
    public void setAnotacoes(String anotacoes) { this.anotacoes = anotacoes; }
}