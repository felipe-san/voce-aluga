package voce.aluga.model;

import java.util.List;

public class Estoque {
    private int id;
    private int filialId;
    private int totalVeiculos;
    public List<Veiculo> veiculosDisponiveis;
    private List<Veiculo> veiculosManutencao;
    private List<Veiculo> veiculosAlocados;
}
