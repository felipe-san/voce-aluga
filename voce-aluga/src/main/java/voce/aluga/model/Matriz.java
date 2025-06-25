package voce.aluga.model;

import java.util.List;

public class Matriz {
    private int id;
    private String nome;
    private String endereco;
    private String email;
    private int cnpj; //ctz que nao quer deixar String?
    private String telefone;
    private int capacidadeEstoque;
    private List<Veiculo> veiculos;
    private List<Usuario> funcionarios;
}
