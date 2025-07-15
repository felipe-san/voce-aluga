package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.GrupoVeiculo;
import voce.aluga.repository.GrupoVeiculoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GrupoVeiculoService {

    @Autowired
    private GrupoVeiculoRepository grupoVeiculoRepository;

    public GrupoVeiculo salvar(GrupoVeiculo grupo) {
        return grupoVeiculoRepository.save(grupo);
    }

    public List<GrupoVeiculo> listarTodos() {
        return grupoVeiculoRepository.findAll();
    }

    public Optional<GrupoVeiculo> buscarPorId(int id) {
        return grupoVeiculoRepository.findById(id);
    }

    public void deletar(int id) {
        grupoVeiculoRepository.deleteById(id);
    }
}
