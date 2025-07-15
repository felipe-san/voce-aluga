package voce.aluga.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class ListaSuja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int idCliente;

    @Column(nullable = false, length = 255)
    private String motivo;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dataInclusao;

    @Temporal(TemporalType.DATE)
    private Date dataExclusao;

    public void adicionarCliente(int idCliente, String motivo) {
        this.idCliente = idCliente;
        this.motivo = motivo;
        this.dataInclusao = new Date();
    }

    public void removerCliente() {
        this.dataExclusao = new Date();
    }

    public int getId() { 
        return id; 
    }

    public int getIdCliente() { 
        return idCliente; 
    }
    public void setIdCliente(int idCliente) { 
        this.idCliente = idCliente; 
    }

    public String getMotivo() { 
        return motivo; 
    }
    public void setMotivo(String motivo) { 
        this.motivo = motivo; 
    }

    public Date getDataInclusao() { 
        return dataInclusao; 
    }

    public void setDataInclusao(Date dataInclusao) { 
        this.dataInclusao = dataInclusao; 
    }

    public Date getDataExclusao() { 
        return dataExclusao; 
    }

    public void setDataExclusao(Date dataExclusao) { 
        this.dataExclusao = dataExclusao; 
    }
}

