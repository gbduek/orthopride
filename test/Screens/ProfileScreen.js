import React, { useContext } from 'react';
import { Container, Box, Avatar, Typography, Button, Grid, Card, CardContent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataContext } from '../Context/DataContext';
import { motion } from 'framer-motion'; // Import Framer Motion
import userPic from '../assets/unnamed.jpg'

const ProfileScreen = () => {
  const { userData } = useContext(DataContext);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Container maxWidth="md">
      {/* Profile Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          mt={6} 
          mb={4}
        >
          <Avatar
            alt={userData.user_name || "User Name"}
            src={userPic}
            sx={{
              width: 120,
              height: 120,
              mb: 3,
              border: '4px solid #7FC60F', // Custom orange border
              boxShadow: 6, // Add shadow
            }}
          />
          <Typography variant="h4" gutterBottom>
            {userData.user_name || "John Doe"}
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            {userData.email || "johndoe@example.com"}
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />} 
            sx={{ mt: 2, backgroundColor: '#7FC60F', ':hover': { backgroundColor: '#6ba60c' } }}
          >
            Editar Perfil
          </Button>
        </Box>
      </motion.div>

      {/* Profile Details */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card sx={{ mt: 4, mb: 3, p: 3, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#7FC60F' }}>
              Sobre
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Role: {userData.role || "N/A"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Instituição: {userData.organization_name || "N/A"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Tipo da Instituição: {userData.type || "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Details */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#7FC60F' }}>
                  Skills
                </Typography>
                <Typography variant="body1" color="textSecondary">React, JavaScript, UI/UX Design</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#7FC60F' }}>
                  Hobbies
                </Typography>
                <Typography variant="body1" color="textSecondary">Photography, Traveling, Reading</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#7FC60F' }}>
            Informações de Contato
          </Typography>
          <Typography variant="body1" color="textSecondary">Email: {userData.contact_info || "N/A"}</Typography>
          <Typography variant="body1" color="textSecondary">Endereço: {userData.address || "N/A"}</Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ProfileScreen;