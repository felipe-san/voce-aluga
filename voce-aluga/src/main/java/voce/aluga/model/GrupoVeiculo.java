package voce.aluga.model;

import jakarta.persistence.*;

@Entity
public class GrupoVeiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 50)
    private String nomeGrupo;

    @Column(nullable = false)
    private float tarifaBase;

    public int getId() {
        return id;
    }

    public String getNomeGrupo() {
        return nomeGrupo;
    }

    public void setNomeGrupo(String nomeGrupo) {
        this.nomeGrupo = nomeGrupo;
    }

    public float getTarifaBase() {
        return tarifaBase;
    }

    public void setTarifaBase(float tarifaBase) {
        this.tarifaBase = tarifaBase;
    }
}

