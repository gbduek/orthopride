// src/Context/DataContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create the context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState('No data');
  const [user_name, setUserName] = useState('No data');
  const [token, setToken] = useState('');
  const [organization_id, setOrgId] = useState('No data')

  // Login function
  const login = async (email, password, navigate) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { token } = response.data;
      
      // Store token in state and localStorage
      setToken(token);
      setIsAuthenticated(true);
      setError('');
      navigate('/dashboard'); // Use navigate passed as an argument

      // Fetch user data after successful login
      fetchUserData();
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  // Logout function
  const logout = (navigate) => {
    setIsAuthenticated(false);
    setUserData(null);
    setToken('');
    navigate('/login');
  };

  // Fetch user data function
  const fetchUserData = async () => {
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:3000/user/5', { // Replace '5' with actual user ID
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUserData(response.data);
      const { user_name, organization_id } = userData;
      setUserName(user_name);
      setOrgId(organization_id);

      console.log('User data:', response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch user data');
      console.error('Fetch user data error:', error);
    }
  };


  return (
    <DataContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      error,
      userData,
      token,
      user_name,
      organization_id
      }}>
      {children}
    </DataContext.Provider>
  );
};
