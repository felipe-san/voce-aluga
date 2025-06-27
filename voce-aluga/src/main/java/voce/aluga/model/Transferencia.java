package voce.aluga.model;

import java.util.Date;

public class Transferencia {
    private int id;
    private int veiculoId;
    private Date inicioTransferencia;
    private Date finalTransferencia;
    private int filialOrigemId;
    private int filialDestinoId;
    private String status;
    private String anotacoes;
}
