import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemButton,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import CampaignIcon from '@mui/icons-material/Campaign';
import ListAltIcon from '@mui/icons-material/ListAlt';
import logo from './assets/Logo2.PNG';
import title from './assets/title.png';
import userPic from './assets/unnamed.jpg';

const drawerWidth = 240; // Expanded width
const drawerCollapsedWidth = 56; // Collapsed width, only showing icons

const DrawerNavigator = () => {
  const [open, setOpen] = useState(false); // Manage if the drawer is manually opened
  const [hovered, setHovered] = useState(false); // Manage if the drawer is hovered

  const handleDrawerToggle = () => {
    setOpen(!open); // Toggle the drawer manually
  };

  const handleDrawerHover = (isHovering) => {
    setHovered(isHovering); // Set hover state
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `100%`,
          backgroundColor: '#7FC60F',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <img src={title} alt="Title" style={{ width: '50%', height: '92%', marginTop: '8px' }} />
          </Typography>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Avatar
              alt="User"
              src={userPic}
              sx={{
                width: 50,
                height: 50,
                border: '2px solid white',
                marginLeft: '1900%',
              }}
            />
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open || hovered}
        onMouseEnter={() => handleDrawerHover(true)}
        onMouseLeave={() => handleDrawerHover(false)}
        sx={{
          width: open || hovered ? drawerWidth : drawerCollapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open || hovered ? drawerWidth : drawerCollapsedWidth,
            transition: 'width 0.3s',
            boxSizing: 'border-box',
            backgroundColor: '#7FC60F',
            overflowX: 'hidden',
            display: 'flex', // Ensure content is always shown
            alignItems: 'center', // Center items when collapsed
            marginTop: '50px',
          },
        }}
      >
        <Toolbar />
        
        <div
          style={{
            padding: '5px',
            textAlign: 'center',
            margin: '-20px 0 0 0',
            width: open || hovered ? '100%' : 'auto', // Adjust width dynamically
            display: 'flex',
            justifyContent: 'center', // Center the image in both states
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: open || hovered ? '50%' : '36px', // Adjust size based on drawer state
              height: open || hovered ? 'auto' : '36px', // Maintain aspect ratio for icon size
              transition: 'width 0.3s, height 0.3s', // Smooth transition effect
              marginBottom: '15px',
            }}
          />
        </div>

        <List sx={{ padding: 0, width: '100%' }}>
          {[
            { text: 'Página Inicial', icon: <HomeIcon sx={{ color: 'white' }} />, link: '/dashboard' },
            { text: 'Equipe', icon: <BadgeIcon sx={{ color: 'white' }} />, link: '/team' },
            { text: 'Eventos', icon: <EventIcon sx={{ color: 'white' }} />, link: '/events' },
            { text: 'Tarefas', icon: <ListAltIcon sx={{ color: 'white' }} />, link: '/tasks' },
            { text: 'Marketing', icon: <CampaignIcon sx={{ color: 'white' }} />, link: '/marketing' },
            { text: 'Financeiro', icon: <AttachMoneyIcon sx={{ color: 'white' }} />, link: '/finance' },
            { text: 'Relatórios', icon: <BarChartIcon sx={{ color: 'white' }} />, link: '/reports'},
            { text: 'Logout', icon: <LogoutIcon sx={{ color: 'white' }} />, link: '/login' }
          ].map((item, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={item.link}
              sx={{
                justifyContent: open || hovered ? 'initial' : 'center',
                px: 2.5, // Padding adjustment for icons when collapsed
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open || hovered ? 2 : 'auto',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {(open || hovered) && (
                <ListItemText primary={item.text} sx={{ color: 'white', whiteSpace: 'nowrap' }} />
              )}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <main
        style={{
          flexGrow: 1,
          padding: '16px',
          transition: 'margin-left 0.3s ease-in-out',
          marginLeft: open || hovered ? `${drawerWidth  - 300}px` : `${drawerCollapsedWidth - 150}px`,
        }}
      >
        <Toolbar />
        {/* Routes should be defined in the parent component or App.js */}
      </main>
    </div>
  );
};

export default DrawerNavigator;
