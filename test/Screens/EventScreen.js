import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction,
  Snackbar, Paper, Grid, Card, CardContent, Slide
} from '@mui/material';
import { Edit, Delete, Add, FilterList } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DataContext } from '../Context/DataContext';
import Calendar from 'react-calendar';

const EventScreen = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState({ name: '', date: dayjs() });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [stats, setStats] = useState({ upcoming: 0, total: 0 });
  const { token, organization_id } = useContext(DataContext);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/event/events?organization_id=${organization_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(response.data);
        setFilteredEvents(response.data);
        calculateStats(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setSnackbarMessage('Failed to load events');
        setSnackbarOpen(true);
      }
    };

    setUpdated(false);
    fetchEvents();
  }, [token, updated]);

  const calculateStats = (events) => {
    const upcoming = events.filter(event => dayjs(event.date).isAfter(dayjs(), 'day')).length;
    setStats({
      upcoming,
      total: events.length
    });
  };

  const handleClickOpen = (event = null) => {
    setEditingEvent(event);
    setEventDetails(event ? { name: event.name, date: dayjs(event.date) } : { name: '', date: dayjs() });
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSave = async () => {
    if (editingEvent) {
      setEvents(events.map(event =>
        event.id === editingEvent.id
          ? { ...editingEvent, ...eventDetails, date: eventDetails.date.format('YYYY-MM-DD HH:mm:ss') }
          : event
      ));
      setSnackbarMessage('Event updated successfully!');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/events', {
          name: eventDetails.name,
          date: eventDetails.date.format('YYYY-MM-DD HH:mm:ss'),
          description: eventDetails.description || '',
          organization_id: 1,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setEvents([...events, { id: response.data.eventId, ...eventDetails }]);
        setSnackbarMessage('Evento adicionado!');
      } catch (error) {
        console.error('Error saving event:', error);
        setSnackbarMessage('Failed to save event');
      }
    }
    handleClose();
    setSnackbarOpen(true);
    setUpdated(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/events/${id}?organization_id=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setEvents(events.filter(event => event.id !== id));
        setSnackbarMessage('Evento deletado!');
      } else {
        setSnackbarMessage('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setSnackbarMessage('Failed to delete event');
    }
    setSnackbarOpen(true);
    setUpdated(true);
  };

  const handleFilterChange = () => {
    let filtered = events;

    if (filterName) {
      filtered = filtered.filter(event => event.name.toLowerCase().includes(filterName.toLowerCase()));
    }

    if (filterDate) {
      filtered = filtered.filter(event => dayjs(event.date).isSame(filterDate, 'day'));
    }

    setFilteredEvents(filtered);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: '20px' }}>
        <Typography color='#7FC60F' fontFamily={'poppins'} fontWeight={'bold'} variant="h2" gutterBottom>Eventos</Typography>

        {/* Statistics Section */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Card sx={{ width: '100%', padding: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">Estatísticas</Typography>
                  <Typography variant="body1">Total de Eventos: {stats.total}</Typography>
                  <Typography variant="body1">Eventos a realizar: {stats.upcoming}</Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
              <Calendar
                onChange={setCalendarDate}
                value={calendarDate}
                tileClassName={({ date, view }) => events.some(event => dayjs(event.date).isSame(date, 'day')) ? 'highlight' : null}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Filter Section */}
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>Filtros</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Nome do Evento"
                variant="outlined"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                sx={{ transition: '0.3s', '&:hover': { borderColor: '#7FC60F' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                label="Data do Evento"
                value={filterDate}
                onChange={(date) => setFilterDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Button
                variant="contained"
                startIcon={<FilterList />}
                onClick={handleFilterChange}
                sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#6ba60c' }, backgroundColor: '#7FC60F' }}
              >
                Aplicar Filtros
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Event List */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
              <Typography variant="h5" gutterBottom>Upcoming Events</Typography>
              {filteredEvents.length === 0 ? (
                <Typography variant="body1">No upcoming events found.</Typography>
              ) : (
                <List>
                  {filteredEvents.map(event => (
                    <ListItem key={event.id} divider>
                      <ListItemText primary={event.name} secondary={dayjs(event.date).format('MMMM D, YYYY')} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleClickOpen(event)} sx={{ transition: '0.3s', '&:hover': { color: '#7FC60F' } }}>
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDelete(event.id)} sx={{ transition: '0.3s', '&:hover': { color: '#f44336' } }}>
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>

          {/* Add Event Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleClickOpen()}
             sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#6ba60c' }, backgroundColor: '#7FC60F' }}>
              Adicionar Evento
            </Button>
          </Grid>
        </Grid>

        {/* Dialog for Adding/Editing Event */}
        <Dialog open={dialogOpen} onClose={handleClose} TransitionComponent={SlideTransition}>
          <DialogTitle>{editingEvent ? 'Editar Evento' : 'Adicionar Evento'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nome do Evento"
              fullWidth
              variant="outlined"
              value={eventDetails.name}
              onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <DatePicker
              label="Data do Evento"
              value={eventDetails.date}
              onChange={(date) => setEventDetails({ ...eventDetails, date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancelar</Button>
            <Button onClick={handleSave} color="primary">Salvar</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </div>
    </LocalizationProvider>
  );
};

// Slide transition for dialog
const SlideTransition = (props) => <Slide direction="up" {...props} />;

export default EventScreen;