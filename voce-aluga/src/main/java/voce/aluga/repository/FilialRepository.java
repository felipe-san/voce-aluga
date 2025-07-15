package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import voce.aluga.model.Filial;

@Repository
public interface FilialRepository extends JpaRepository<Filial, Integer> {
}

