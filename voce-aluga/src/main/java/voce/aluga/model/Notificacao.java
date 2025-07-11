package voce.aluga.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Notificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer clienteId;

    @Column(nullable = false)
    private String tipoNotificacao;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String mensagem;

    @Column(nullable = false)
    private LocalDateTime dataEnvio;

    @Column(nullable = false)
    private String status; 

    public void enviarNotificacao(String mensagem) {
        this.mensagem = mensagem;
        this.dataEnvio = LocalDateTime.now();
        this.status = "enviada";
    }

    public void atualizarStatus(String status) {
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getClienteId() {
        return clienteId;
    }

    public void setClienteId(Integer clienteId) {
        this.clienteId = clienteId;
    }

    public String getTipoNotificacao() {
        return tipoNotificacao;
    }

    public void setTipoNotificacao(String tipoNotificacao) {
        this.tipoNotificacao = tipoNotificacao;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }

    public void setDataEnvio(LocalDateTime dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
