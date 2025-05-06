import React, { useState, useContext } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { DataContext } from '../../Context/DataContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const mediaStyle = {
  width: '100%',
  maxHeight: '200px',
  borderRadius: '8px',
  marginBottom: '16px',
  objectFit: 'cover',
};

const CreatePostInsta = ({ open, handleClose }) => {
  const [description, setDescription] = useState('');
  const { token } = useContext(DataContext);
  const imageUrl =
    'https://marketplace.canva.com/EAFtfLfw8fk/1/0/800w/canva-modern-new-product-launch-fashion-promotion-animated-video-instagram-post-cQfAqwtwP5A.mp4'; // Replace this URL with your media URL

  // Function to determine if the URL is a video or an image based on the file extension
  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv'];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const handleSubmit = async () => {
    if (!description) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/instagram/create-media`,
        {
          imageUrl: imageUrl,
          caption: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming you store the token in local storage
          },
        }
      );

      if (response.status === 200) {
        alert('Post successfully created on Instagram');
        handleClose();
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating Instagram post:', error);
      alert('Error creating post');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-post-modal-title"
      aria-describedby="create-post-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="create-post-modal-title" variant="h6">
            Criar Post no Instagram
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Conditional Rendering: Show video or image based on file type */}
        {isVideo(imageUrl) ? (
          <video controls style={mediaStyle}>
            <source src={imageUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={imageUrl} alt="Preview" style={mediaStyle} />
        )}

        <TextField
          label="Descrição"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!description}
        >
          Publicar
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePostInsta;