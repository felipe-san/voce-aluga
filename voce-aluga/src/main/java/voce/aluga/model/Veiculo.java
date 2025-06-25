package voce.aluga.model;

import java.util.Date;

public class Veiculo {
    private int id;
    public String modelo;
    public Date ano;
    private String placa;
    private int quilometragem;
    public int capacidadeTanque;
    public int consumoMedio;
    private Date dataProximaManutencao;
    private text historicoManutencao;
    private String status;
}
