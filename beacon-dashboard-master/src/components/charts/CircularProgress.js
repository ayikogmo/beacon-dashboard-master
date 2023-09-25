import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManuCount, manuCountSelector } from "slices/circularprogress";
import { fetchManu, manuSelector } from "slices/manufacturer";
// COMPONENTS AND STYLES
import "react-circular-progressbar/dist/styles.css";
import { Box, Stack, Divider, Paper, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Spinner } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import "../css/charts.css";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";



const MobileProgress = () => {

  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [codeLoc, setCodeLoc] = useState();

  // DISPATCH: FROM SLICE
  const dispatch = useDispatch();
  const { manucount, loading, hasErrors } =
    useSelector(manuCountSelector);
  const { manufacturer } = useSelector(manuSelector);
  const { dateTimeFrom, dateTimeTo } = useSelector(manuCountSelector)

  console.log(manucount.count_10m);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const manufacturerData = searchParams.get("manufacturer");
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to")
    const code = searchParams.get("code")

    console.log("code", code)


    setSelectedManufacturer(manufacturerData);
    setCodeLoc(code);


    if (manufacturerData && dateTimeFrom && dateTimeTo && code) {
      dispatch(fetchManuCount(manufacturerData, dateTimeFrom, dateTimeTo, code));
    }
  }, []);

  const renderManuCount = () => {
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: "transparent",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      width: "268px",
      height: "24vh",
      color: theme.palette.text.secondary,
      borderRadius: "0",
      boxShadow: "none",
      backgroundImage: "none",
      border: "0",
    }));

    return (
      <Box sx={{ flexShrink: 2, width: "98%" }}>
        <FlexBetween>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
            sx={{
              padding: "8px",
              justifyContent: "center",
              borderRadius: "4px",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
            }}
          >
            <Item>
              {loading && (
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{
                    marginTop: "3rem",
                    marginBottom: "1rem",
                    marginLeft: "5.7rem",
                    display: "flex",
                    width: "52px",
                    height: "52px",
                  }}
                />
              )}
              {!loading && hasErrors && (
                <p
                  style={{
                    marginTop: "3rem",
                    marginBottom: "1rem",
                    marginLeft: "5.7rem",
                    display: "flex",
                    fontSize: "18px",
                  }}
                >
                  No data.
                </p>
              )}
              {!loading && !hasErrors && (
                <>
                  <CircularProgressbar
                    value={manucount.count_10m}
                    text={`${manucount.count_10m}%`}
                    styles={{
                      width: "75%",
                      trailColor: "#1c2038",
                      backgroundColor: "#1c2038",
                      pathColor: "rgb(21, 168, 49)",
                      textColor: "#e8e8e8",
                      marginTop: "-49%",
                    }}
                  />
                </>
              )}
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "8px",
                  paddingBottom: "8px",
                  color: "#e8e8e8"
                }}
              >
                Below 10M
              </Typography>
            </Item>

            <Item>
              {loading && (
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{
                    marginTop: "3rem",
                    marginBottom: "1rem",
                    marginLeft: "5.7rem",
                    display: "flex",
                    width: "52px",
                    height: "52px",
                  }}
                />
              )}
              {!loading && hasErrors && (
                <p
                  style={{
                    marginTop: "3rem",
                    marginBottom: "1rem",
                    marginLeft: "5.7rem",
                    display: "flex",
                    fontSize: "18px",
                  }}
                >
                  No data.
                </p>
              )}
              {!loading && !hasErrors && (
                <>
                  <CircularProgressbar
                    value={manucount.count_20m}
                    text={`${manucount.count_20m}%`}
                    styles={buildStyles({
                      width: "75%",
                      trailColor: "#1c2038",
                      backgroundColor: "#1c2038",
                      pathColor: "rgb(21, 168, 49)",
                      textColor: "#e8e8e8",
                      marginTop: "-49%",
                    })}
                  />
                </>
              )}
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                10M TO 20M
              </Typography>
            </Item>

            <Item>
              {loading && (
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{
                    marginTop: "3rem",
                    marginBottom: "1rem",
                    marginLeft: "5.7rem",
                    display: "flex",
                    width: "52px",
                    height: "52px",
                  }}
                />
              )}
              {!loading && hasErrors && (
                <p
                  style={{
                    marginTop: "3rem",
                    marginBottom: "1rem",
                    marginLeft: "5.7rem",
                    display: "flex",
                    fontSize: "18px",
                  }}
                >
                  No data.
                </p>
              )}
              {!loading && !hasErrors && (
                <>
                  <CircularProgressbar
                    value={manucount.count_30m}
                    text={`${manucount.count_30m}%`}
                    styles={{
                      width: "75%",
                      trailColor: "#1c2038",
                      backgroundColor: "#1c2038",
                      pathColor: "rgb(21, 168, 49)",
                      textColor: "#e8e8e8",
                      marginTop: "-49%",
                    }}
                  />
                </>
              )}
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                20M TO 30M
              </Typography>
            </Item>
            <Item>
              {loading && (
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{
                    marginTop: "3rem",
                    marginBottom: "1rem",
                    marginLeft: "5.7rem",
                    display: "flex",
                    width: "52px",
                    height: "52px",
                  }}
                />
              )}
              {!loading && hasErrors && (
                <p
                  style={{
                    marginTop: "3rem",
                    marginBottom: "1rem",
                    marginLeft: "5.7rem",
                    display: "flex",
                    fontSize: "18px",
                  }}
                >
                  No data.
                </p>
              )}
              {!loading && !hasErrors && (
                <>
                  <CircularProgressbar
                    value={manucount.overall}
                    text={`${manucount.overall}%`}
                    styles={buildStyles({
                      width: "75%",
                      trailColor: "#1c2038",
                      backgroundColor: "#1c2038",
                      pathColor: "rgb(107, 232, 197)",
                      textColor: "#e8e8e8",
                      marginTop: "-49%",
                    })}
                  />
                </>
              )}
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                OVERALL DATA
              </Typography>
            </Item>
          </Stack>
        </FlexBetween>
      </Box>
    );
  };

  return <div>{renderManuCount()}</div>;
};

export default MobileProgress;
