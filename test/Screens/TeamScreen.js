import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, List, ListItem, ListItemText, Avatar, Stack } from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { DataContext } from '../Context/DataContext';

const TeamScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { token, organization_id } = useContext(DataContext);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/employee/employees?organization_id=${organization_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenDialog = (employee = null) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = async (employee) => {
    try {
      if (employee.id) {
        // Edit existing employee
        await axios.put(`/employee/employees/${employee.id}`, employee);
        setEmployees(employees.map((emp) => (emp.id === employee.id ? employee : emp)));
      } else {
        // Add new employee
        const response = await axios.post('/employee/employees', employee);
        setEmployees([...employees, { ...employee, id: response.data.employeeId }]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`/employee/employees/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const filteredEmployees = employees.filter((employee) => 
    `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" component="h1" 
                  sx={{marginBottom: '40px', color: '#7FC60F', fontWeight: 'bold'}}
                  fontFamily={'poppins'} fontWeight={'bold'}
                  gutterBottom>
          Equipe
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search employees..."
          onChange={handleSearch}
          InputProps={{
            startAdornment: <Search />,
          }}
        />
        <Button
            variant="contained"
            component="label"
            sx={{ mb: 2, backgroundColor: '#7FC60F', '&:hover': { backgroundColor: '#6bbf07' } }} 
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}>
          Adicionar funcionário
        </Button>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <List>
              {filteredEmployees.map((employee) => (
                <ListItem
                  key={employee.id}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton onClick={() => handleOpenDialog(employee)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteEmployee(employee.id)}>
                        <Delete />
                      </IconButton>
                    </Stack>
                  }
                  onClick={() => setSelectedEmployee(employee)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Avatar src={employee.profile_picture} sx={{ mr: 2 }} />
                  <ListItemText primary={`${employee.first_name} ${employee.last_name}`} secondary={employee.role} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {selectedEmployee ? (
            <EmployeeProfile employee={selectedEmployee} />
          ) : (
            <Typography variant="h6" color="textSecondary">
              Select an employee to view details
            </Typography>
          )}
        </Grid>
      </Grid>
      <AddEditEmployeeDialog
        open={isDialogOpen}
        employee={selectedEmployee}
        onClose={handleCloseDialog}
        onSave={handleSaveEmployee}
      />
    </Box>
  );
};

const EmployeeProfile = ({ employee }) => (
  <Paper elevation={3} sx={{ p: 3 }}>
    <Stack direction="row" spacing={2}>
      <Avatar src={employee.profile_picture} sx={{ width: 80, height: 80 }} />
      <Box>
        <Typography variant="h5">{`${employee.first_name} ${employee.last_name}`}</Typography>
        <Typography variant="subtitle1">{employee.role}</Typography>
        <Typography variant="body2" color="textSecondary">
          {employee.email}
        </Typography>
        <Button variant="outlined" startIcon={<Edit />} sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </Box>
    </Stack>
  </Paper>
);

const AddEditEmployeeDialog = ({ open, employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: employee ? employee.id : null,
    first_name: employee ? employee.first_name : '',
    last_name: employee ? employee.last_name : '',
    role: employee ? employee.role : '',
    profile_picture: employee ? employee.profile_picture : '',
    email: employee ? employee.email : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{employee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          name="first_name"
          fullWidth
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="last_name"
          fullWidth
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Role"
          name="role"
          fullWidth
          value={formData.role}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Profile Picture URL"
          name="profile_picture"
          fullWidth
          value={formData.profile_picture}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamScreen;