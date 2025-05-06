// src/Banner.js
import React from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel styling
import banner1 from '../assets/banner1.png'

// Styled Box for Carousel Container
const CarouselContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Banner component
const Banner = () => {
  const banners = [
    {
      image: banner1,
      title: 'Bem vindo a nossa plataforma!',
    },
    {
      image: banner1,
      title: 'Dê uma olhada nas nossas últimas features!',
    },
    {
      image: banner1,
      title: 'Mantenha-se conectado conosco!',
    },
  ];

  return (
    <CarouselContainer>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={5000}
        emulateTouch
        stopOnHover
      >
        {banners.map((banner, index) => (
          <Card key={index} elevation={3}>
            <CardMedia
              component="img"
              height="300"
              image={banner.image}
              alt={`Banner ${index + 1}`}
              style={{ objectFit: 'cover' }}
            />
            <Typography
              variant="h5"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                color: '#fff',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
                fontFamily: 'Poppins',
                fontWeight: 700,
              }}
            >
              {banner.title}
            </Typography>
          </Card>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Banner;