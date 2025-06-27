package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import voce.aluga.model.Estoque;

public interface EstoqueRepository extends JpaRepository<Estoque, Integer> {
}
