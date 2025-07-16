import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography
} from '@mui/material';
import {
  Dashboard,
  DirectionsCar,
  People,
  Assignment,
  Inventory,
  Person,
  History
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { isAdmin, currentPage, setCurrentPage } = useAuth();

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { id: 'veiculos', label: 'Veículos', icon: <DirectionsCar /> },
    { id: 'clientes', label: 'Clientes', icon: <People /> },
    { id: 'contratos', label: 'Contratos', icon: <Assignment /> },
    { id: 'estoque', label: 'Estoque', icon: <Inventory /> },
  ];

  const clientMenuItems = [
    { id: 'perfil', label: 'Meu Perfil', icon: <Person /> },
    { id: 'reservas', label: 'Minhas Reservas', icon: <Assignment /> },
    { id: 'historico', label: 'Histórico', icon: <History /> },
  ];

  const menuItems = isAdmin ? adminMenuItems : clientMenuItems;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          top: 64, // Height of AppBar
          height: 'calc(100% - 64px)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <Typography variant="h6" sx={{ px: 2, mb: 2, color: 'text.secondary' }}>
          {isAdmin ? 'Administração' : 'Área do Cliente'}
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={currentPage === item.id}
                onClick={() => setCurrentPage(item.id)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
