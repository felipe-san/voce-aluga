package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import voce.aluga.model.Manutencao;

@Repository
public interface ManutencaoRepository extends JpaRepository<Manutencao, Integer> {
}