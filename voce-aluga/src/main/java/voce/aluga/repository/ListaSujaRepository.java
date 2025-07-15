package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import voce.aluga.model.ListaSuja;

import java.util.Optional;

@Repository
public interface ListaSujaRepository extends JpaRepository<ListaSuja, Integer> {
    Optional<ListaSuja> findByIdCliente(int idCliente);
}
