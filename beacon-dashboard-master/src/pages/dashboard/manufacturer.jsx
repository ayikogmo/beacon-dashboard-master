import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import MobileProgress from "components/charts/CircularProgress";
import BarGraph from "components/charts/BarChart";
import MobileActivity from "components/charts/Activity";
import Heatmap from "components/charts/heatmap";
import Header from "components/Header"
import UserService from "services/userService";
// import { styled } from "@mui/material/styles";

const MobileDashboard = () => {

  const [content, setContent] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate()


  useEffect(() => {
    const userToken = localStorage.getItem('user');

    if (userToken) {
      UserService.getUser().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);
        }
      );
    } else {
      navigate("/login")
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Box sx={{ marginBottom: "50px", display: "inline-block" }}>
          {/* <header className="manufacturer">
        <h3>
          {content}
        </h3>
      </header> */}
          <Header />
          <Box sx={{ padding: "2.4rem" }}>
            {/* <h3>{content}</h3> */}
            <MobileProgress />
          </Box>
          <Box sx={{ width: "97%" }}>
            <FlexBetween>
              <BarGraph />
              <MobileActivity />
            </FlexBetween>
          </Box>
          <Box sx={{ padding: "2.4rem", marginBottom: "50px" }}>
            {/* <h3>{content}</h3> */}
            <Heatmap />
          </Box>
        </Box>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default MobileDashboard;
