package voce.aluga.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Matriz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, unique = true)
    private String cnpj;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private int capacidadeEstoque;

    @ElementCollection
    @CollectionTable(name = "matriz_veiculos", joinColumns = @JoinColumn(name = "matriz_id"))
    @Column(name = "veiculo")
    private List<String> veiculos = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "matriz_funcionarios", joinColumns = @JoinColumn(name = "matriz_id"))
    @Column(name = "funcionario")
    private List<String> funcionarios = new ArrayList<>();


    public void solicitarVeiculo(String veiculo) {
        veiculos.add(veiculo);
    }

    public void gerenciarFuncionarios(List<String> funcionarios) {
        this.funcionarios = funcionarios;
    }

    public List<String> listarFuncionarios() {
        return funcionarios;
    }

    public List<String> consultarTodosVeiculos() {
        return veiculos;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public int getCapacidadeEstoque() {
        return capacidadeEstoque;
    }

    public void setCapacidadeEstoque(int capacidadeEstoque) {
        this.capacidadeEstoque = capacidadeEstoque;
    }

    public List<String> getVeiculos() {
        return veiculos;
    }

    public void setVeiculos(List<String> veiculos) {
        this.veiculos = veiculos;
    }

    public List<String> getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(List<String> funcionarios) {
        this.funcionarios = funcionarios;
    }
}
