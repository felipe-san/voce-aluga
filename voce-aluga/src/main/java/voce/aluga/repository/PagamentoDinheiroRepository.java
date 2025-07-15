package voce.aluga.repository;

import voce.aluga.model.PagamentoDinheiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagamentoDinheiroRepository extends JpaRepository<PagamentoDinheiro, Integer> {
}

