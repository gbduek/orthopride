// src/Layout.js
import React from 'react';
import DrawerNavigator from '../DrawerNavigator';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DrawerNavigator />
      <main
        style={{
          flexGrow: 1,
          padding: '16px',
          marginLeft: 0, // Adjust margin for drawer width or mobile
          transition: 'margin-left 0.3s ease-in-out',
          marginTop: '65px'
        }}
      >
        <Outlet /> {/* This renders the matched child route */}
      </main>
    </div>
  );
};

export default Layout;
