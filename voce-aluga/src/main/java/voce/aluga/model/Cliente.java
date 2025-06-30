package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class Cliente extends Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 50) 
    private String documento;

    @Column(length = 255)
    private String fidelidade;

    @Column(length = 255) 
    private boolean listaSuja;

    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(nullable = false, unique = true, length = 20)
    private String cnh;

    public Long getId() {
        return (long) id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getFidelidade() {
        return fidelidade;
    }

    public void setFidelidade(String fidelidade) {
        this.fidelidade = fidelidade;
    }

    public boolean isListaSuja() {
        return listaSuja;
    }

    public void setListaSuja(boolean listaSuja) {
        this.listaSuja = listaSuja;
    }

    public int resgatarPontosFidelidades() {
        try {
            return Integer.parseInt(fidelidade);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public String getCpf() {
        return cpf;
    }

    public String getCnh() {
        return cnh;
    }
}

