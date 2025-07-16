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
    
    // Campos para compatibilidade com frontend
    private int veiculoId;
    private int quantidade;
    private String localizacao;

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

    public void setId(int id) {
        this.id = id;
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

    // Getters e setters para compatibilidade com frontend
    public int getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(int veiculoId) {
        this.veiculoId = veiculoId;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

}