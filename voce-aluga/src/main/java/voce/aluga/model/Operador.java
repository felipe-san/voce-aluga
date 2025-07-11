package voce.aluga.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Operador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private Integer filialId;

    @Column(nullable = false)
    private String funcao;


    public List<Veiculo> abrirEstoque(List<Veiculo> veiculos) {
        return veiculos.stream()
                .filter(v -> v.getStatus().equalsIgnoreCase("disponível"))
                .toList(); 
    }

    public void efetuarLocacao(Object reserva) {

    }

    public boolean verificarDisponibilidade(Veiculo veiculo) {
        return veiculo.getStatus().equalsIgnoreCase("disponível");
    }

    public void solicitarManutencao(Veiculo veiculo, String motivo) {
        veiculo.setStatus("em manutenção");
        veiculo.setHistoricoManutencao(
            veiculo.getHistoricoManutencao() + "\nSolicitada por operador: " + motivo
        );
    }

    public void receberVeiculo(Veiculo veiculo) {
        veiculo.setStatus("disponível");
    }

    public void emitirContrato(Object contrato) {

    }

    public void alterarStatusVeiculo(Veiculo veiculo, String novoStatus) {
        veiculo.setStatus(novoStatus);
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Integer getFilialId() {
        return filialId;
    }

    public void setFilialId(Integer filialId) {
        this.filialId = filialId;
    }

    public String getFuncao() {
        return funcao;
    }

    public void setFuncao(String funcao) {
        this.funcao = funcao;
    }

    
}

