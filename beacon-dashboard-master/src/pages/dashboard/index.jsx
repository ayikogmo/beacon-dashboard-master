import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import MobileGrid from "components/charts/TableGrid";
import DataChart from "components/charts/DataChart";
import DoughnutChart from "components/charts/Doughnut";
import LineChart from "components/charts/LineChart";
import UserService from "services/userService";
import { Height } from "@mui/icons-material";

const classes = {
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: "2rem",
  },
  chartContainer: {
    height: '100%',
  },
  };


const Dashboard = () => {
  const [content, setContent] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("user");

    if (userToken) {
      UserService.getUser().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);
        }
      );
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div style={classes.paper}>
          <Grid container spacing={3}>
            <Grid container flex spacing={3} margin={1} marginBottom={3}>
              <Grid item xs={5}>
                <DataChart />
              </Grid>
              <Grid item xs={7}>
             <LineChart />
              </Grid>
            </Grid>
          <Grid container spacing={3} margin={1}>
            <Grid item xs={6}>
              <MobileGrid />
            </Grid>
            <Grid item xs={6}>
              <DoughnutChart />
            </Grid>
          </Grid>
          </Grid>
        </div>
      ) : (
        // <Box sx={{ paddingBottom: "80px"}}>
        //   <Box sx={{ display: "flex"}}>
        //     {/* <h3>{content}</h3> */}
        //     <FlexBetween sx={{ marginTop: "3rem ", marginRight: "2rem" }}>
        //       <DataChart />
        //       <LineChart />
        //     </FlexBetween>
        //   </Box>
        //   <Box>
        //     <FlexBetween
        //       sx={{
        //         backgroundColor: "#252b48",
        //         marginTop: "2.5rem ",
        //         marginLeft: "2.5rem",
        //         marginRight: "1rem",
        //         borderRadius: "8px",
        //       }}
        //     >
        //       <MobileGrid />
        //       <DoughnutChart />
        //     </FlexBetween>
        //   </Box>
        // </Box>
        navigate("/login")
      )}
    </>
  );
};

export default Dashboard;
