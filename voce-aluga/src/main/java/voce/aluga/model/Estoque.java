package voce.aluga.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Estoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int filialId;
    private int totalVeiculos;

    @ElementCollection
    private List<Integer> veiculosDisponiveis;

    @ElementCollection
    private List<Integer> veiculosManutencao;

    @ElementCollection
    private List<Integer> veiculosAlocados;

    @ElementCollection
    private List<Integer> veiculosAlugados;


    public int getId() { 
        return id; 
    }

    public int getFilialId() { 
        return filialId; 
    }

    public void setFilialId(int filialId) { 
        this.filialId = filialId; 
    }

    public int getTotalVeiculos() { 
        return totalVeiculos; 
    }

    public void setTotalVeiculos(int totalVeiculos) { 
        this.totalVeiculos = totalVeiculos; 
    }

    public List<Integer> getVeiculosDisponiveis() { 
        return veiculosDisponiveis; 
    }

    public void setVeiculosDisponiveis(List<Integer> veiculosDisponiveis) { 
        this.veiculosDisponiveis = veiculosDisponiveis; 
    }

    public List<Integer> getVeiculosManutencao() { 
        return veiculosManutencao; 
    }

    public void setVeiculosManutencao(List<Integer> veiculosManutencao) { 
        this.veiculosManutencao = veiculosManutencao; 
    }

    public List<Integer> getVeiculosAlocados() { 
        return veiculosAlocados; 
    }

    public void setVeiculosAlocados(List<Integer> veiculosAlocados) { 
        this.veiculosAlocados = veiculosAlocados; 
    }

    public List<Integer> getVeiculosAlugados() { 
        return veiculosAlugados; 
    }
    public void setVeiculosAlugados(List<Integer> veiculosAlugados) { 
        this.veiculosAlugados = veiculosAlugados; 
    }

}