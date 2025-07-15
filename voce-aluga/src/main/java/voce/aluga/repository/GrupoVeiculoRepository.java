package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import voce.aluga.model.GrupoVeiculo;

@Repository
public interface GrupoVeiculoRepository extends JpaRepository<GrupoVeiculo, Integer> {
}

