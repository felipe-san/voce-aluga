package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import voce.aluga.model.Devolucao;

@Repository
public interface DevolucaoRepository extends JpaRepository<Devolucao, Integer> {
}

