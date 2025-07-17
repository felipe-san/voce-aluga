package voce.aluga.testes;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
void testeLoginClienteComSucesso() {
    Cliente cliente = new Cliente();
    cliente.setNome("João Login");
    cliente.setEndereco("Av. Brasil, 1000");
    cliente.setCpf("11122233344");
    cliente.setSenha("senha123");
    cliente.setEmail("joao@login.com");
    cliente.setCnh("12345678901");
    cliente.setDocumento("RG987654");
    cliente.setFidelidade("25");
    cliente.setListaSuja(false);
    clienteRepository.save(cliente);

    Cliente login = clienteRepository.findByEmailAndSenha("joao@login.com", "senha123");
    assertThat(login).isNotNull();
    assertEquals("João Login", login.getNome());
}

@Test
void testeResgateDePontosFidelidadeValido() {
    Cliente cliente = new Cliente();
    cliente.setFidelidade("50");
    int pontos = cliente.resgatarPontosFidelidades();
    assertEquals(50, pontos);
}

@Test
void testeResgateDePontosFidelidadeInvalido() {
    Cliente cliente = new Cliente();
    cliente.setFidelidade("abc"); 
    int pontos = cliente.resgatarPontosFidelidades();
    assertEquals(0, pontos); 
}

@Test
void testeClienteComListaSuja() {
    Cliente cliente = new Cliente();
    cliente.setNome("Carlos Sujo");
    cliente.setEndereco("Rua Suja, 999");
    cliente.setCpf("99988877766");
    cliente.setSenha("sujo123");
    cliente.setEmail("carlos@sujo.com");
    cliente.setCnh("98765432100");
    cliente.setDocumento("RG000000");
    cliente.setFidelidade("0");
    cliente.setListaSuja(true);
    Cliente salvo = clienteRepository.save(cliente);

    Cliente encontrado = clienteRepository.findById(salvo.getId()).orElse(null);
    assertThat(encontrado).isNotNull();
    assertThat(encontrado.isListaSuja()).isTrue();
}

@Test
void testeAtualizacaoDadosCliente() {
    Cliente cliente = new Cliente();
    cliente.setNome("Ana Atualiza");
    cliente.setEndereco("Rua Velha, 123");
    cliente.setCpf("11223344556");
    cliente.setSenha("senhaAntiga");
    cliente.setEmail("ana@atualiza.com");
    cliente.setCnh("10293847566");
    cliente.setDocumento("RG123321");
    cliente.setFidelidade("15");
    cliente.setListaSuja(false);
    Cliente salvo = clienteRepository.save(cliente);

    salvo.setEndereco("Rua Nova, 456");
    salvo.setFidelidade("30");
    clienteRepository.save(salvo);

    Cliente atualizado = clienteRepository.findById(salvo.getId()).orElse(null);
    assertThat(atualizado).isNotNull();
    assertEquals("Rua Nova, 456", atualizado.getEndereco());
    assertEquals(30, atualizado.resgatarPontosFidelidades());
}

@Test
void testeDeletarCliente() {
    Cliente cliente = new Cliente();
    cliente.setNome("Bruno Apagar");
    cliente.setEndereco("Rua Apagar, 000");
    cliente.setCpf("10101010101");
    cliente.setSenha("apagar123");
    cliente.setEmail("bruno@delete.com");
    cliente.setCnh("11111111111");
    cliente.setDocumento("RG123123");
    cliente.setFidelidade("5");
    cliente.setListaSuja(false);
    Cliente salvo = clienteRepository.save(cliente);

    Long id = salvo.getId();
    clienteRepository.deleteById(id);

    Cliente deletado = clienteRepository.findById(id).orElse(null);
    assertThat(deletado).isNull();
}

}

