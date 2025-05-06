import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

const Predict = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchGeminiContent = async () => {
    try {
      // Define the request payload to match what the backend expects
      const requestBody = {
        text: query,
      };

      // Make a POST request to your Node.js API
      const res = await axios.post('http://localhost:3000/api/gemini', requestBody);
      
      // Extract the text from the API response
      const text = res.data.candidates[0]?.content?.parts[0]?.text || 'No response text available';
      setResponse(text);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from Gemini API');
      setResponse(null);
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Teste KesherAI
        </Typography>
        <TextField
          label="Ask a question"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleInputChange}
          style={{ marginBottom: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchGeminiContent}
          fullWidth
        >
          Mande sua pergunta para a KesherAI!
        </Button>
        {error && (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
        {response && (
          <Box
            component="pre"
            style={{
              marginTop: '1rem',
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            <Typography variant="body1">
              {response}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Predict;