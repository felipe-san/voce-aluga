package voce.aluga.repository;

import voce.aluga.model.PagamentoPix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagamentoPixRepository extends JpaRepository<PagamentoPix, Integer> {
}

