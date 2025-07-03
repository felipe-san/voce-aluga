package voce.aluga.testes;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import voce.aluga.model.Cliente;
import voce.aluga.repository.ClienteRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = voce.aluga.Main.class)
@ActiveProfiles("test") 
public class ClienteTests {

    @Autowired
    private ClienteRepository clienteRepository;

    @Test
    void testeFuncionalSalvarBuscarCliente() {
        Cliente cliente = new Cliente();
        cliente.setNome("Maria Teste");
        cliente.setEndereco("Rua das Flores, 123");  
        cliente.setCpf("12345678901");
        cliente.setSenha("minhaSenha123");  
        cliente.setEmail("maria@teste.com");
        cliente.setCnh("12345678900");
        cliente.setDocumento("RG123456");
        cliente.setFidelidade("10");
        cliente.setListaSuja(false);
        Cliente salvo = clienteRepository.save(cliente);

        Cliente encontrado = clienteRepository.findById(salvo.getId()).orElse(null);
        assertThat(encontrado).isNotNull();
        assertThat(encontrado.getCpf()).isEqualTo("12345678901");
    }
}
