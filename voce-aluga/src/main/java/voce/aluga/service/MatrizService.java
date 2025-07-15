package voce.aluga.service;

import voce.aluga.model.Matriz;
import voce.aluga.repository.MatrizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatrizService {

    @Autowired
    private MatrizRepository matrizRepository;

    public List<Matriz> listarTodas() {
        return matrizRepository.findAll();
    }

    public Optional<Matriz> buscarPorId(Integer id) {
        return matrizRepository.findById(id);
    }

    public Matriz salvar(Matriz matriz) {
        return matrizRepository.save(matriz);
    }

    public Matriz atualizar(Integer id, Matriz novaMatriz) {
        return matrizRepository.findById(id).map(matriz -> {
            matriz.setNome(novaMatriz.getNome());
            matriz.setEndereco(novaMatriz.getEndereco());
            matriz.setEmail(novaMatriz.getEmail());
            matriz.setCnpj(novaMatriz.getCnpj());
            matriz.setTelefone(novaMatriz.getTelefone());
            matriz.setCapacidadeEstoque(novaMatriz.getCapacidadeEstoque());
            return matrizRepository.save(matriz);
        }).orElseThrow(() -> new RuntimeException("Matriz não encontrada"));
    }

    public void deletar(Integer id) {
        matrizRepository.deleteById(id);
    }
}
