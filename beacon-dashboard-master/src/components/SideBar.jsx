import React, { useEffect, useState } from "react";
// import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { fetchLocation, locationSelector } from "slices/locations";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  CastConnected,
  Search,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import FlexBetween from "./FlexBetween";
import { Spinner } from "react-bootstrap";
import "../index.css";


// STYLING

const SidebarWrap = styled.div`
  width: 100%;
`;

// NAVIGATION ITEMS
const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    location: "/dashboard"
  },
  {
    text: "OOH",
    icon: <CastConnected />,
    location: "/dashboard"
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  // const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  // Set Current Value To Active Page
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  


  return (

    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: "230px",
            "& .MuiDrawer-paper": {
              color: theme.palette.grey[50],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: "230px",
              "& .MuiButtonBase-root.MuiListItemButton-root": {
                marginTop: "16px",
              },
            },
          }}
        >
          <Box width="100%">
            <Box margin="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.grey[400]}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h5" fontWeight="bold" paddingTop="4px">
                    BEACON

                  </Typography>

                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <Divider />
            <FlexBetween
              borderRadius="8px"
              margin="1rem"
              marginLeft="1.5rem"
              gap="3rem"
              paddingLeft="0.5rem"
            >
              {/* <InputBase
                placeholder="Search..."
              /> */}
              {/* <IconButton>
                <Search />
              </IconButton> */}
            </FlexBetween>
            <List>

        
                  
              {/* NAVIGATION */}
              {navItems.map(({ text, icon, location }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ margin: "2.25rem 0rem 1rem 3rem" }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      // onClick={() => {
                      //   // navigate(`/dashboard}`);
                      //   // setActive(lcText);
                      // }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          minWidth: "40px",
                          color:
                            active === lcText
                              ? theme.palette[600]
                              : theme.palette.grey[50],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined
                          sx={{
                            ml: "auto",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Divider
              style={{
                width: "72%",
                alignItems: "left",
                float: "right",
                marginRight: "16px",
              }}
            />
           
            {/* LOCATIONS */}
            <SidebarWrap>
     
              {SidebarData.map((item, index) => {
                return (
                  <> 
                  <SubMenu item={item} key={index} />
                  </>
                );
              })}
             
            </SidebarWrap>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
