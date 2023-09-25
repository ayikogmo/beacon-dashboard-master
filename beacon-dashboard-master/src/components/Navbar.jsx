import { useState, useEffect, useCallback } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  // ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocation, locationSelector } from "slices/locations";
import { setMode } from "actions";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Typography,
} from "@mui/material";

import DatePickers from "./widgets/DatePicker";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "slices/auth";
import EventBus from "common/EventBus";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDashboard, setShowDashboard] = useState(false);
  const [showManufacturer, setShowManufacturer] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  // const { isLoggedIn, user } = useSelector((state) => state.auth);

  const { location } = useSelector(locationSelector);
  const [selectedLocation, setSelectedLocation] = useState("");


  const logOut = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/login')
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchLocation());
  }, [dispatch]);


// GET USER ROLES
  useEffect(() => {
    if (currentUser) {
      setShowDashboard(currentUser.roles.includes("admin"));
      setShowManufacturer(currentUser.roles.includes("admin"));
    } else {
      setShowDashboard(false);
      setShowManufacturer(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  },[currentUser, logOut]);

  
  // GET LOCATION
  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      setSelectedLocation(storedLocation);
    }
  }, []);


  // const getLocation = localStorage.getItem("selectedLocations");
 

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        paddingTop: "8px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            color={theme.palette.secondary[100]}
            fontWeight="500"
            fontSize="24px"
            sx={{ m: "0.2rem 2.5rem 0 3rem" }}
          >
            {selectedLocation}
            {/* {getLocation} */}
            {/* {getLocation.map((location, index) => (
              <span key={index}>{location}</span>
            ))} */}
          </Typography>
        </FlexBetween>

        {/* RIGHTSIDE */}
        <FlexBetween>
          <DatePickers />
          {/* <IconButton>`
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>  */}
          {currentUser ? (
            <Link to="/" className="nav-link">
              <IconButton
                className="btn"
                onClick={logOut}
                style={{
                  marginLeft: "4px",
                  marginRight: "4px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",

                  ".MuiButtonBase-root .MuiIconButton-root:hover": {
                    border: "none",
                    color: "#41b883",
                    cursor: "pointer",
                  },
                  // ".MuiTouchRipple-root:hover": {
                  //   border: "none",
                  //   backgroundColor: "transparent"
                  // }
                }}
              >
                <span style={{ marginLeft: "8px", fontSize: "15px" }}>
                  Logout
                </span>
              </IconButton>
            </Link> 
          ) : (
            // navigate('/login')
            <Link to="/" className="nav-link">
              <IconButton
                style={{
                  marginLeft: "4px",
                  marginRight: "4px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    marginLeft: "8px",
                    marginRight: "8px",
                    fontSize: "16px",
                  }}
                >
                  Logout
                </span>
              </IconButton>
            </Link>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
