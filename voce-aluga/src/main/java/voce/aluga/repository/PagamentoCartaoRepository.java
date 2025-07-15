package voce.aluga.repository;

import voce.aluga.model.PagamentoCartao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagamentoCartaoRepository extends JpaRepository<PagamentoCartao, Integer> {
}
