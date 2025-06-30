package voce.aluga.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sistemaId;

    @Column(nullable = false, length = 255) 
    private String procedimento;

    @Column(length = 255) 
    private String historico;

    @Column(length = 255) 
    private LocalDate dataAuditoria;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @Column(length = 255) 
    private Usuario usuario;

    public int getId() { 
        return id; 
    }
    public void setId(int id) { 
        this.id = id; 
    }

    public int getSistemaId() { 
        return sistemaId; 
    }

    public void setSistemaId(int sistemaId) { 
        this.sistemaId = sistemaId; 
    }

    public String getProcedimento() { 
        return procedimento; 
    }

    public void setProcedimento(String procedimento) { 
        this.procedimento = procedimento; 
    }

    public String getHistorico() { 
        return historico; 
    }
    public void setHistorico(String historico) { 
        this.historico = historico; 
    }

    public LocalDate getDataAuditoria() { 
        return dataAuditoria; 
    }

    public void setDataAuditoria(LocalDate dataAuditoria) { 
        this.dataAuditoria = dataAuditoria; 
    }

    public Usuario getUsuario() { 
        return usuario; 
    }
    
    public void setUsuario(Usuario usuario) { 
        this.usuario = usuario; 
    }

    public void agendarAuditoria(LocalDate data) {
        this.dataAuditoria = data;
    }

    public String consultarHistorico() {
        return this.historico;
    }
}
