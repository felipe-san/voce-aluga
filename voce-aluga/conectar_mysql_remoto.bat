@echo off
echo ========================================
echo   TESTE DE CONEXAO MYSQL REMOTO
echo ========================================
echo.
echo Para conectar ao banco do Junior, voce precisa:
echo.
echo 1. PEDIR PARA O JUNIOR:
echo    - IP do computador dele (ipconfig)
echo    - Liberar porta 3306 no firewall
echo    - Criar usuario para voce no MySQL
echo    - Configurar MySQL para aceitar conexoes remotas
echo.
echo 2. COMANDOS QUE O JUNIOR PRECISA EXECUTAR:
echo.
echo    No MySQL (como root):
echo    CREATE USER 'seu_usuario'@'%%' IDENTIFIED BY 'sua_senha';
echo    GRANT ALL PRIVILEGES ON voce_aluga.* TO 'seu_usuario'@'%%';
echo    FLUSH PRIVILEGES;
echo.
echo    No arquivo my.ini do MySQL, adicionar:
echo    bind-address = 0.0.0.0
echo.
echo    Reiniciar servico MySQL
echo    Liberar porta 3306 no Windows Firewall
echo.
echo 3. TESTAR CONEXAO:
echo    Substitua IP_DO_JUNIOR no application.properties
echo    Exemplo: 192.168.1.100:3306
echo.
echo 4. ALTERNATIVA SIMPLES:
echo    Use o mock backend (porta 8080) que ja funciona!
echo.
echo ========================================
pause
