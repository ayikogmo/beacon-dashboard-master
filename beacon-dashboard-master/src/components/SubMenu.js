import  { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {useTheme} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation, locationSelector } from "slices/locations";
import { SidebarData } from "./SidebarData";
import { fetchDateTime, dateTimeSelector } from "slices/datetime";
import Navbar from './Navbar';
import { logout } from "slices/auth";
import EventBus from "common/EventBus";


const SubMenu = ({ item }) => {

const theme = useTheme();
const navigate = useNavigate();
const dispatch = useDispatch();

const [subnav, setSubnav] = useState(false);
const showSubnav = () => setSubnav(!subnav);

const [showDashboard, setShowDashboard] = useState(false);
const [showManufacturer, setShowManufacturer] = useState(false);
const { user: currentUser } = useSelector((state) => state.auth);


const logOut = useCallback(() => {
  dispatch(logout());
  localStorage.removeItem('user');
  // navigate('/login')
}, [dispatch, navigate]);


    // GET USER ROLES
    useEffect(() => {
      if (currentUser) {
        setShowDashboard(currentUser.roles.includes("admin"));
      } else {
        setShowDashboard(false);
      }
  
      EventBus.on("logout", () => {
        logOut();
      });
  
      return () => {
        EventBus.remove("logout");
      };
    },[currentUser, logOut]);

    


// LOCATION CSS
const SidebarLink = styled.div`
  background: transparent;
  display: flex;
  color: #e8e8e8;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 48px;
  margin-bottom: 8px;
  margin-top: 8px;
  text-decoration: none;
  font-size: 15px;

  &:hover{
    cursor: pointer;
    text-decoration: none;
    color: #41b883;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 2rem;
  cursor: pointer;
`;

const DropdownLink = styled(Link)`
  height: 42px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 15px;
  background: transparent

  &:hover {
    border-left: 4px solid #41b883;
    cursor: pointer;
    text-decoration: none;
    color: #f5f5f5;
    background: transparent
  }
  &:active {
    color: #f5f5f5;
    background: #41b883
  }
`;


const { location, loading, hasErrors } = useSelector(locationSelector);
const [selectedLocation, setSelectedLocation] = useState("");


useEffect(() => {
  dispatch(fetchLocation());
}, [dispatch]);


useEffect(() => {

  if (loading) return
  if (Object.keys(location).length === 0) return
  
  console.log("ITEM", item.title)

  if (item.subNav.length !== 0)
    item.subNav = []

  console.log(item.subNav.length)
  console.log(location)
  console.log("SideBar", SidebarData)

    try {
      const datefrom = localStorage.getItem("startDate");
      const dateto = localStorage.getItem("endDate");
      const storedLocation = localStorage.getItem("selectedLocation");

      // Click locations
      const savedLocations = [];

      console.log("LOCATIONN", location.locations[item.title] )

      for (let i = 0; i < location.locations[item.title].length; i++) {
        item.subNav.push ( {
          title: location.locations[item.title][i].route ? location.locations[item.title][i].location + "-" + location.locations[item.title][i].route : location.locations[item.title][i].location,
          path: "/dashboard?code=" + location.locations[item.title][i].code + "&from=" + datefrom + "&to=" + dateto
        }
        )
        // item.subNav.push(savedLocation);
        // savedLocations.push(savedLocation)
      }
      //handleClick()
      // Set Locations to Local Storage
      // localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

 
        // Your existing code...
        // Set selectedLocation based on the stored value in localStorage
        if (storedLocation) {
          setSelectedLocation(storedLocation);
        }
      
    } catch (e) {
      console.log("error", e)
    }

  

  console.log(SidebarData);
}, [location, loading]);




  const handleFetchData = (path) => {
    // const datefrom = localStorage.getItem("startDate");
    // const dateto = localStorage.getItem("endDate");
    const searchParams = new URLSearchParams(path.replace("/dashboard", ""));
    const code = searchParams.get("code");

    const URLParams = new URLSearchParams(window.location.search);
    const datefrom = URLParams.get("from");
    const dateto = URLParams.get("to");

    localStorage.setItem("code", code);
    localStorage.setItem("startDate", datefrom);
    localStorage.setItem("endDate", dateto);

    // alert(code);
    for (let i = 0; i < Object.keys(location.locations).length; i++) {
      //for (let i = 0; i < location.locations.length; i++) {
      for (let j = 0; j < location.locations[Object.keys(location.locations)[i]].length; j++) {
        // alert("sad")
        console.log("XXX",location.locations[Object.keys(location.locations)[i]][j].code);
        console.log("YYY", code);
        if (location.locations[Object.keys(location.locations)[i]][j].code === code) {
          localStorage.setItem("selectedLocation", location.locations[Object.keys(location.locations)[i]][j].location + " " + location.locations[Object.keys(location.locations)[i]][j].route )
        }
      }
    }

    setSelectedLocation(location)



    navigate(`/dashboard?code=${code}&from=${datefrom}&to=${dateto}`); 
    dispatch(
      fetchDateTime({
        startdate: datefrom,
        enddate: dateto,
        code
      })
    );
  }


  const handleClick = (path) => { 
    const searchParams = new URLSearchParams(path.replace("/dashboard", ""));
    const code = searchParams.get("code");
    const datefrom = searchParams.get("from");
    const dateto = searchParams.get("to");
  
    localStorage.setItem("code", code);
    localStorage.setItem("startDate", datefrom);
    localStorage.setItem("endDate", dateto);

    handleFetchData(path);
    window.location.reload()
  };
  

  return (
    <>
      <SidebarLink onClick={item.subNav && showSubnav}>
      {loading && !hasErrors && (
        <div>
        <SidebarLabel onClick={showSubnav}>{item.title}</SidebarLabel>
        {item.icon}
        </div>
    )} 
     {!loading && hasErrors && (
     <div>
     <SidebarLabel onClick={showSubnav}>{item.title}</SidebarLabel>
     {item.icon}
     </div>
    )} 

     {!loading && !hasErrors && (
      <>
        <div>
          {item.icon}
          <SidebarLabel onClick={showSubnav}>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
        </>
     )}
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index} onClick={() => handleClick(item.path)}>
            <>
              <SidebarLabel>{item.title}</SidebarLabel>
              {item.icon}
            </>
            </DropdownLink>
          );
        })}
    </>  
  );
};

export default SubMenu;
