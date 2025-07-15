package voce.aluga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import voce.aluga.model.ListaSuja;
import voce.aluga.repository.ListaSujaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ListaSujaService {

    @Autowired
    private ListaSujaRepository listaSujaRepository;

    public ListaSuja adicionarCliente(ListaSuja entrada) {
        entrada.setDataInclusao(new java.util.Date());
        return listaSujaRepository.save(entrada);
    }

    public ListaSuja removerCliente(int idCliente) {
        Optional<ListaSuja> registro = listaSujaRepository.findByIdCliente(idCliente);
        if (registro.isPresent()) {
            ListaSuja lista = registro.get();
            lista.setDataExclusao(new java.util.Date());
            return listaSujaRepository.save(lista);
        }
        return null;
    }

    public Optional<ListaSuja> verificarCliente(int idCliente) {
        return listaSujaRepository.findByIdCliente(idCliente);
    }

    public List<ListaSuja> listarTodos() {
        return listaSujaRepository.findAll();
    }
}
