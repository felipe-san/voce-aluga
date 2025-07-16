package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import voce.aluga.model.Veiculo;

import java.util.List;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Integer> {
    
    List<Veiculo> findByDisponivel(boolean disponivel);
    
    List<Veiculo> findByCategoria(String categoria);
    
    List<Veiculo> findByStatus(String status);
    
    List<Veiculo> findByMarca(String marca);
}
