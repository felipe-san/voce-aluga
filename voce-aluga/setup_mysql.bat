@echo off
echo Criando banco de dados MySQL para VOCE ALUGA...
echo.

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -pneeko0505 -e "CREATE DATABASE IF NOT EXISTS voce_aluga;"

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -pneeko0505 voce_aluga < "c:\Users\eikev\OneDrive\Documentos\GitHub\voce-aluga\voce-aluga\create_database.sql"

echo.
echo Banco criado com sucesso!
echo.
echo Verificando tabelas criadas:
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -pneeko0505 voce_aluga -e "SHOW TABLES;"

pause
