package voce.aluga.model;

import java.util.Date;

public class Reserva {
    private int id;
    private int clienteId;
    private int contratoId;
    private Date dataInicio;
    private Date dataFim;
    private float valorTotal;
    private float descontoAplicado;
    private int filialIdRetirada;
    private int filialIdDevolucao;
    private String formaPagamento;
    private String seguroContrato;
    private float tarifasAplicadas;
    private String status;
}
