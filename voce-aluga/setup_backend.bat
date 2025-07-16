@echo off
echo ========================================
echo   CONFIGURACAO BACKEND JAVA + MYSQL
echo ========================================

echo 1. Configurando variaveis de ambiente...
set JAVA_HOME=C:\Program Files\Java\jre1.8.0_451
set PATH=%JAVA_HOME%\bin;%PATH%

echo 2. Testando Java...
java -version

echo 3. Para compilar o projeto, voce precisa:
echo    - Instalar Maven ou usar IDE como IntelliJ/Eclipse
echo    - Ou usar o Spring Boot CLI
echo    - Ou usar o Gradle Wrapper

echo 4. Para iniciar o MySQL:
echo    - Execute: net start mysql80 (como administrador)
echo    - Ou configure XAMPP/WAMP

echo 5. Executar script SQL:
echo    - Conecte ao MySQL: mysql -u root -p
echo    - Execute: source init_db.sql

echo ========================================
echo   ALTERNATIVA: USAR MOCK BACKEND
echo ========================================
echo Se o MySQL nao estiver disponivel, 
echo mantenha o mock backend (Node.js) rodando
echo na porta 8080 e ajuste o frontend.

pause
