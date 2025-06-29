package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import voce.aluga.model.Contrato;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Integer> {
}
