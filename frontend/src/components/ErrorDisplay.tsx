import React from 'react';
import { Alert, AlertTitle, Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorBoundaryProps {
  error?: Error | null;
  onRetry?: () => void;
  message?: string;
}

const ErrorDisplay: React.FC<ErrorBoundaryProps> = ({ 
  error, 
  onRetry, 
  message = "Erro ao conectar com o servidor" 
}) => {
  const getErrorMessage = () => {
    if (error?.message?.includes('Network Error')) {
      return 'Não foi possível conectar com o servidor. Verifique se o backend está rodando na porta 8080.';
    }
    if (error?.message?.includes('404')) {
      return 'Endpoint não encontrado. Verifique se a API está configurada corretamente.';
    }
    if (error?.message?.includes('500')) {
      return 'Erro interno do servidor. Verifique os logs do backend.';
    }
    return error?.message || message;
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Alert severity="error">
        <AlertTitle>Erro de Conexão</AlertTitle>
        {getErrorMessage()}
        {onRetry && (
          <Box sx={{ mt: 2 }}>
            <Button
              startIcon={<RefreshIcon />}
              variant="outlined"
              size="small"
              onClick={onRetry}
            >
              Tentar Novamente
            </Button>
          </Box>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorDisplay;
