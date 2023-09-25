import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivStats, activStatsSelector } from "slices/activity";
import { fetchManu, manuSelector } from "slices/manufacturer";
import { Box, Divider, Typography } from "@mui/material";
import { Spinner } from "react-bootstrap";
// import {ArrowDropDownOutlinedIcon , ArrowDropUpOutlinedIcon } from '@mui/icons-material';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "../css/charts.css";

const MobileActivity = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [codeLoc, setCodeLoc] = useState();
  const [loadingActivStats, setLoadingActivStats] = useState(false);
  const [activStatsData, setActivStatsData] = useState({});
  const [errorActivStats, setErrorActivStats] = useState(false);

  // DISPATCH: FROM SLICE
  const dispatch = useDispatch();
  const { activitystats, loading, hasErrors } = useSelector(activStatsSelector);
  const { manufacturer } = useSelector(manuSelector);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const manufacturerData = searchParams.get("manufacturer");
    const code = searchParams.get("code");

    // CONSOLE
    console.log("manufacturer: " + manufacturerData);

    setSelectedManufacturer(manufacturerData);
    setCodeLoc(code);

    if ((manufacturerData, code)) {
      dispatch(fetchActivStats(manufacturerData, code));
    }
  }, []);

  // useEffect(() => {
  //   if (selectedManufacturer) {
  //     setLoadingActivStats(true);
  //     dispatch(fetchActivStats(selectedManufacturer, manufacturer))
  //       .then((data) => {
  //         setActivStatsData(data.payload);
  //         setLoadingActivStats(false);
  //         setErrorActivStats(false);
  //       })
  //       .catch(() => {
  //         setLoadingActivStats(false);
  //         setErrorActivStats(true);
  //       });
  //   }
  // }, [dispatch, manufacturer, selectedManufacturer]);

  const renderActivStats = () => {
    let activityStats = null;

    if (activitystats && activitystats.length > 0) {
      activityStats = activitystats.map((stats, index) => {
        if (stats.change_type === "no data") {
          return (
            <Typography key={index} sx={{ marginTop: "16px" }}>
              {stats.datetime}: {stats.change_type}
            </Typography>
          );
        } else if (stats.change_type === "inc") {
          return (
            <Typography
              key={index}
              sx={{
                marginTop: "16px",
                fontSize: "14px",
                letterSpacing: "0.1px",
              }}
            >
              {stats.datetime}:{" "}
              <FaArrowUp
                style={{ fontSize: "14px", color: "rgb(21, 168, 49)" }}
              />{" "}
              {`${stats.change_value}%`} from yesterday
            </Typography>
          );
        } else if (stats.change_type === "dec") {
          return (
            <Typography key={index} sx={{ marginTop: "16px" }}>
              {stats.datetime}:{" "}
              <FaArrowDown style={{ fontSize: "14px", color: "#e50914" }} />{" "}
              {`${stats.change_value}%`} from yesterday
            </Typography>
          );
        } else {
          return null;
        }
      });
    }

    return (
      <Box
        id="mobile-activity"
        sx={{
          marginLeft: "2rem",
          width: "100%",
          marginRight: "auto",
          minHeight: "500px",
          overflowY: "auto"
        }}
      >
        <Typography
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginBottom: "8px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#e8e8e8"
          }}
        >
          Activity
        </Typography>
        <Divider sx={{marginBottom: "16px", marginTop: "16px"}}/>
        {loading && <Spinner animation="border" variant="primary" />}
        {!loading && hasErrors && <p style={{ marginTop: "16px" }}>No data.</p>}
        {!loading &&
          !hasErrors &&
         (activityStats)}
      </Box>
    );
  };

  return <div>{renderActivStats()}</div>;
};

export default MobileActivity;
