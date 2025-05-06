// src/Dashboard.js
import React, { useContext } from 'react';
import { Grid, Card, CardContent, Typography, Button, Paper, IconButton } from '@mui/material';
import { DataContext } from './Context/DataContext';
import { styled } from '@mui/material/styles';
import { CalendarToday, BarChart, Info } from '@mui/icons-material';
import Banner from './Components/Banner';

// Styled components
const Header = styled('header')(({ theme }) => ({
  padding: theme.spacing(2),
  color: '#7FC60F',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  color: '#7FC60F',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  minHeight: 150,
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[5],
  },
}));

const Dashboard = () => {
  const { user_name } = useContext(DataContext);

  return (
    <div style={{ margin: '25px' }}>
      <Header>
        <Typography variant="h3" component="h1" fontFamily={'poppins'} fontWeight="700">
          Olá, {user_name}
        </Typography>
      </Header>

      {/* Banner Section */}
      <div style={{marginBottom: '65px'}}>
        <Banner />
      </div>

      <Grid container spacing={3}>
        {/* Overview Section */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <SectionTitle fontFamily={'poppins'} variant="h4">Vista Geral</SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardContent>
                    <Typography fontFamily={'poppins'} variant="h6">Performance e estatísticas</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginTop: '10px' }}
                      startIcon={<BarChart />}
                    >
                      Ver
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardContent>
                    <Typography fontFamily={'poppins'} variant="h6">Eventos</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginTop: '10px' }}
                      startIcon={<CalendarToday />}
                    >
                      Ver
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardContent>
                    <Typography fontFamily={'poppins'} variant="h6">Reports</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginTop: '10px' }}
                      startIcon={<Info />}
                    >
                      Ver
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <SectionTitle fontFamily={'poppins'} variant="h5">Atividades Recentes</SectionTitle>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="body1">Here you can display recent activities such as user actions, system updates, or logs.</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Upcoming Tasks Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <SectionTitle fontFamily={'poppins'} variant="h5">Tarefas por vir</SectionTitle>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="body1">List upcoming tasks or deadlines here, including progress or status updates.</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Notifications Section */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <SectionTitle fontFamily={'poppins'} variant="h5">Notificações</SectionTitle>
            <Card>
              <CardContent>
                <Typography variant="body1">Show recent notifications or alerts here to keep users informed.</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
