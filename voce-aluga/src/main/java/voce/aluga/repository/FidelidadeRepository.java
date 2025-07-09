package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import voce.aluga.model.Fidelidade;

@Repository
public interface FidelidadeRepository extends JpaRepository<Fidelidade, Integer> {
}
