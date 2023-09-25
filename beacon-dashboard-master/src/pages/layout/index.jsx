import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/SideBar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const location = useLocation();
  const isManufacturerPage = location.pathname.includes("manufacturer");
  const isLoginPage = location.pathname.includes("login");



  // Render Login Page using Outlet
  if (isLoginPage) {
    return <Outlet />
  }


  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        drawerWidth="250px"
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isManufacturerPage ? (
        <Outlet />
      ) : (
        <Box flexGrow={1}>
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      )}
    </Box>
  );
};

export default Layout;
