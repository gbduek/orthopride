import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Modal } from '@mui/material';
import TaskCard from '../Components/TasksSc/TaskCard';
import TaskFilter from '../Components/TasksSc/TaskFilter';
import TaskForm from '../Components/TasksSc/TaskForm';

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch initial tasks data
    // Replace this with your actual data fetching logic
    const initialTasks = [
      { title: 'Task 1', description: 'Complete the report', dueDate: '2024-09-01' },
      { title: 'Task 2', description: 'Prepare presentation', dueDate: '2024-09-10' },
    ];
    setTasks(initialTasks);
    setFilteredTasks(initialTasks);
  }, []);

  const handleFilter = (filters) => {
    // Apply filters to tasks
    // Replace this with your actual filtering logic
    const { status, dueDate } = filters;
    const filtered = tasks.filter(task => 
      (!status || task.status === status) &&
      (!dueDate || task.dueDate === dueDate)
    );
    setFilteredTasks(filtered);
  };

  const handleCreateOrEdit = (task) => {
    if (selectedTask) {
      // Update existing task
      const updatedTasks = tasks.map(t => (t.title === selectedTask.title ? task : t));
      setTasks(updatedTasks);
    } else {
      // Create new task
      setTasks([...tasks, task]);
    }
    setFilteredTasks([...tasks, task]);
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter(task => task.title !== taskToDelete.title);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  return (
    <Container>
      <Typography variant="h3" fontWeight={'bold'} fontFamily={'Poppins'} color={'#7FC60F'} gutterBottom>
        Tarefas
      </Typography>
      <TaskFilter onFilter={handleFilter} />
      <Grid container spacing={2}>
        {filteredTasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TaskCard
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              onEdit={() => handleOpenModal(task)}
              onDelete={() => handleDeleteTask(task)}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
        sx={{ mt: 2 }}
      >
        Criar Tarefa
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="task-modal-title"
        aria-describedby="task-modal-description"
      >
        <Box sx={{ p: 4, mx: 'auto', mt: '10%', maxWidth: 600, backgroundColor: 'white' }}>
          <TaskForm
            onSubmit={handleCreateOrEdit}
            initialData={selectedTask}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default TaskScreen;