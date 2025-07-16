package voce.aluga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import voce.aluga.model.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Optional<Usuario> findByEmail(@Param("email") String email);
    
    @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.senha = :senha")
    Optional<Usuario> findByEmailAndSenha(@Param("email") String email, @Param("senha") String senha);
    
    boolean existsByEmail(String email);
}

