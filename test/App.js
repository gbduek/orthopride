// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginScreen from './LoginScreen';
import { DataProvider, DataContext } from './Context/DataContext';
import Layout from './Components/Layout';
import Dashboard from './Dashboard';
import EventScreen from './Screens/EventScreen'
import Page2 from './Screens/Page2';
import Page3 from './Screens/Page3';
import FinanceScreen from './Screens/FinanceScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MarketingScreen from './Screens/MarketingScreen';
import TaskScreen from './Screens/TaskScreen';
import TeamScreen from './Screens/TeamScreen';
import Predict from './Screens/Predict';

// Font imports
import '@fontsource/poppins/100.css'; // Thin
import '@fontsource/poppins/200.css'; // Extra Light
import '@fontsource/poppins/300.css'; // Light
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/500.css'; // Medium
import '@fontsource/poppins/600.css'; // Semi Bold
import '@fontsource/poppins/700.css'; // Bold
import '@fontsource/poppins/800.css'; // Extra Bold
import '@fontsource/poppins/900.css'; // Black


function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Private routes wrapped with Layout (which includes DrawerNavigator) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="events" element={<EventScreen />} />
            <Route path="tasks" element={<TaskScreen />} />
            <Route path="page2" element={<Page2 />} />
            <Route path="page3" element={<Page3 />} />
            <Route path="finance" element={<FinanceScreen />} />
            <Route path="marketing" element={<MarketingScreen />} />
            <Route path="team" element={<TeamScreen />} />
            <Route path="reports" element={<Predict />} />
          </Route>


          {/* Default redirect to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

// ProtectedRoute component ensures user authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(DataContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
