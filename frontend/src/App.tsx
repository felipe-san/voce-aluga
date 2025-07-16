import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Clientes from './pages/Clientes';
import Contratos from './pages/Contratos';
import Estoque from './pages/Estoque';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVeiculos from './pages/admin/AdminVeiculos';
import ClientePerfil from './pages/client/ClientePerfil';
import ClienteReservas from './pages/client/ClienteReservas';
import MinhasReservas from './pages/client/MinhasReservas';
import ClienteHistorico from './pages/client/ClienteHistorico';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AppContent: React.FC = () => {
  const { user, currentPage, setCurrentPage } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  const renderCurrentPage = () => {
    if (user.role === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'veiculos':
          return <AdminVeiculos />;
        case 'clientes':
          return <Clientes />;
        case 'contratos':
          return <Contratos />;
        case 'estoque':
          return <Estoque />;
        default:
          return <AdminDashboard />;
      }
    } else {
      switch (currentPage) {
        case 'perfil':
          return <ClientePerfil />;
        case 'reservas':
          return <ClienteReservas />;
        case 'minhas-reservas':
          return <MinhasReservas />;
        case 'historico':
          return <ClienteHistorico />;
        default:
          return <ClientePerfil />;
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {renderCurrentPage()}
        </Box>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
