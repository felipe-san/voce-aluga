package voce.aluga.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private LocalDate ano;

    @Column(nullable = false, unique = true)
    private String placa;

    @Column(nullable = false)
    private int quilometragem;

    @Column(nullable = false)
    private int capacidadeTanque;

    @Column(nullable = false)
    private float consumoMedio;

    @Column(nullable = false)
    private LocalDate dataProximaManutencao;

    @Column(columnDefinition = "TEXT")
    private String historicoManutencao;

    @Column(nullable = false)
    private String status; 

    @Column(nullable = false)
    private Integer filialId;

    @Column(nullable = false)
    private String grupo;


    public void atualizarStatus(String novoStatus) {
        this.status = novoStatus;
    }

    public void atualizarFilial(Integer novaFilialId) {
        this.filialId = novaFilialId;
    }

    public int calcularAutonomia() {
        return Math.round(capacidadeTanque * consumoMedio);
    }

    public LocalDate verificarProximaManutencao() {
        return this.dataProximaManutencao;
    }

    public void verificarPlaca(String placaInformada) {
        if (!this.placa.equalsIgnoreCase(placaInformada)) {
            throw new IllegalArgumentException("Placa informada não corresponde ao veículo.");
        }
    }

    public boolean isAlugado() {
        return this.status.equalsIgnoreCase("alugado");
    }

    public boolean isEmManutencao() {
        return this.status.equalsIgnoreCase("em manutenção");
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public LocalDate getAno() {
        return ano;
    }

    public void setAno(LocalDate ano) {
        this.ano = ano;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public int getQuilometragem() {
        return quilometragem;
    }

    public void setQuilometragem(int quilometragem) {
        this.quilometragem = quilometragem;
    }

    public int getCapacidadeTanque() {
        return capacidadeTanque;
    }

    public void setCapacidadeTanque(int capacidadeTanque) {
        this.capacidadeTanque = capacidadeTanque;
    }

    public float getConsumoMedio() {
        return consumoMedio;
    }

    public void setConsumoMedio(float consumoMedio) {
        this.consumoMedio = consumoMedio;
    }

    public LocalDate getDataProximaManutencao() {
        return dataProximaManutencao;
    }

    public void setDataProximaManutencao(LocalDate dataProximaManutencao) {
        this.dataProximaManutencao = dataProximaManutencao;
    }

    public String getHistoricoManutencao() {
        return historicoManutencao;
    }

    public void setHistoricoManutencao(String historicoManutencao) {
        this.historicoManutencao = historicoManutencao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getFilialId() {
        return filialId;
    }

    public void setFilialId(Integer filialId) {
        this.filialId = filialId;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    
}
