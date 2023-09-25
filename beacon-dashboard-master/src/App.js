import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Import components
import Layout from "pages/layout";
// Import components
import Login from "pages/userlogin/Login"
import Dashboard from "pages/dashboard/index";
import MobileDashboard from "pages/dashboard/manufacturer";
import { logout } from "slices/auth";

// import styles
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "theme";




function App() {
  // importing theme
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route  path="/login" element= {<Login /> } />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manufacturer" element={<MobileDashboard />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;