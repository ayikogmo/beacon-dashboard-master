import { useEffect, useState } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { IconButton, Toolbar, Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchDateTime, dateTimeSelector } from "slices/datetime";
import {fetchManu, manuSelector} from "slices/manufacturer"

const Header = ({ title, subtitle }) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dateTimeFrom, dateTimeTo } = useSelector(dateTimeSelector);
  const [codeLoc, setCodeLoc] = useState();
  const searchParams = new URLSearchParams(window.location.search);
  const manufacturerData = searchParams.get("manufacturer");
   

  useEffect(() => {
    if (manufacturerData) {
      dispatch(fetchManu(manufacturerData));
    }
  }, []);
  
 

  var temp_start = new Date();
  temp_start.setHours(0);
  temp_start.setMinutes(0);
  temp_start.setSeconds(0);


  const handleBackButton = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to");

    setCodeLoc(code);

    // navigate(
    //   `/dashboard?code=${codeLoc}&from=${startDate.toISOString()}&to=${endDate.toISOString()}`
    // );
    navigate(
      `/dashboard?code=${code}&from=${dateTimeFrom}&to=${dateTimeTo}`
    );
    dispatch(
      fetchDateTime({
        dateTimeFrom,
        dateTimeTo,
        codeLoc,
      })
    );
  };

  const handleClickButton = () => {
    handleBackButton();
  };

  return (
    <>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          marginRight: "2rem",
          marginTop: "2rem",
        }}
      >
        <FlexBetween>
          <Box>
            <Typography
              variant="h5"
              color={theme.palette.secondary[100]}
              fontWeight="500"
              fontSize= "32px"
              sx={{ m: "2rem 2.5rem 0 2.5rem" }}
            >
              {manufacturerData}
            </Typography>
            <Typography variant="h5" color={theme.palette.secondary[300]}>
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        <Button onClick={handleClickButton} style={{
          width: "4px",
          marginTop: "32px",
          marginBottom: "-16px"
        }}>
          <IconButton style={{
            border: "none", 
            fontSize: "18px"}}>
            <FaArrowLeft style={{ marginRight: "4px"}} />
            Back
          </IconButton>
        </Button>
      </Toolbar>
    </>
  );
};

export default Header;
