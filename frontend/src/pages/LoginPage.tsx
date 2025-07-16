import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import { DirectionsCar, Login } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin@vocealuga.com');
    setPassword('admin123');
  };

  const fillClientCredentials = () => {
    setEmail('cliente@teste.com');
    setPassword('123456');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          {/* Logo e Informações da Empresa */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <DirectionsCar sx={{ fontSize: 80, mb: 2 }} />
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                VOCÊ ALUGA
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                Aluguel de Veículos com Qualidade e Confiança
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                Oferecemos uma frota moderna e diversificada para atender todas as suas necessidades.
                Desde carros econômicos até veículos de luxo, temos a opção perfeita para você.
              </Typography>
            </Box>
          </Grid>

          {/* Formulário de Login */}
          <Grid item xs={12} md={6}>
            <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Login sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" component="h2" gutterBottom>
                  Acesso ao Sistema
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Faça login para acessar sua conta
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                  variant="outlined"
                />

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Contas de Teste
                </Typography>
              </Divider>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" sx={{ cursor: 'pointer' }} onClick={fillAdminCredentials}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        ADMINISTRADOR
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        admin@vocealuga.com
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        (Clique para preencher)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" sx={{ cursor: 'pointer' }} onClick={fillClientCredentials}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        CLIENTE
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        cliente@teste.com
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        (Clique para preencher)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;
