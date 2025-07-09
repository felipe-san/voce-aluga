package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.Filial;
import voce.aluga.repository.FilialRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FilialService {

    @Autowired
    private FilialRepository filialRepository;

    public Filial salvar(Filial filial) {
        return filialRepository.save(filial);
    }

    public List<Filial> listarTodas() {
        return filialRepository.findAll();
    }

    public Optional<Filial> buscarPorId(int id) {
        return filialRepository.findById(id);
    }

    public void deletar(int id) {
        filialRepository.deleteById(id);
    }
}
