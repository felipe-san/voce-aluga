package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import voce.aluga.model.Veiculo;

import java.util.List;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    
    @Query("SELECT v FROM Veiculo v WHERE v.status = :status")
    List<Veiculo> findByStatus(@Param("status") String status);
    
    @Query("SELECT v FROM Veiculo v WHERE v.categoria = :categoria")
    List<Veiculo> findByCategoria(@Param("categoria") String categoria);
    
    @Query("SELECT v FROM Veiculo v WHERE v.filialId = :filialId")
    List<Veiculo> findByFilialId(@Param("filialId") Integer filialId);
    
    @Query("SELECT v FROM Veiculo v WHERE v.marca = :marca")
    List<Veiculo> findByMarca(@Param("marca") String marca);
}
