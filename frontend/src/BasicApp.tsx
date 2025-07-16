import React from 'react';

function BasicApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1976d2' }}>🚗 Você Aluga</h1>
      <h2>Sistema de Aluguel de Veículos</h2>
      <p>Frontend funcionando! ✅</p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>Status do Sistema:</h3>
        <ul>
          <li>✅ React carregado</li>
          <li>✅ TypeScript compilando</li>
          <li>✅ Vite funcionando</li>
          <li>✅ Servidor na porta 3000</li>
        </ul>
      </div>
    </div>
  );
}

export default BasicApp;
