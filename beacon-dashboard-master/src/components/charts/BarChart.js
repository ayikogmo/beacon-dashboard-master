import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarGraph, barGraphSelector } from "slices/bargraph";
import { fetchManu, manuSelector } from "slices/manufacturer";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import { CSVLink } from "react-csv";

import "../css/charts.css";

import {
  Chart as ChartJS,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = () => {
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: { color: "#e8e8e8", size: "10px" },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: { color: "#e8e8e8", size: "10px" },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        marginTop: 32,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#e8e8e8",
          boxWidth: 32,
          marginBottom: 32,
        },
      },

      title: {
        display: true,
        text: "DISTANCE",
        font: {
          size: "20px",
        },
        color: "#e8e8e8",
        position: "top",
        marginBottom: "32px",
      },
    },
  };

  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [codeLoc, setCodeLoc] = useState();

  // DISPATCH: FROM SLICE
  const dispatch = useDispatch();
  const { cntperdistpermon, loading, hasErrors } =
    useSelector(barGraphSelector);
  const { manufacturer } = useSelector(manuSelector);
  const { dateTimeFrom, dateTimeTo } = useSelector(barGraphSelector);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const manufacturerData = searchParams.get("manufacturer");
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to");
    const code = searchParams.get("code");


    setSelectedManufacturer(manufacturerData);
    setCodeLoc(code);

    if (manufacturerData && dateTimeFrom && dateTimeTo && code) {
      dispatch(
        fetchBarGraph(manufacturerData, dateTimeFrom, dateTimeTo, code)
      ).then((data) => {
        setCsvData(data);
      });
    }
  }, []);

  // EXPORT TO CSV
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    if (cntperdistpermon) {
      const labels = cntperdistpermon.m10.labels;
      const below10Data = cntperdistpermon.m10.data;
      const twentyMData = cntperdistpermon.m20.data;
      const thirtyMData = cntperdistpermon.m30.data;

      if (labels && below10Data && twentyMData && thirtyMData) {
        const csvDataExp = [["DISTANCE", "BELOW 10M", "10-20M", "20-30M"]];
        for (let i = 0; i < labels.length; i++) {
          csvDataExp.push([
            labels[i] ? labels[i].toString() : "",
            below10Data[i] ? below10Data[i].toString() : "",
            twentyMData[i] ? twentyMData[i].toString() : "",
            thirtyMData[i] ? thirtyMData[i].toString() : "",
          ]);
        }

        setCsvData(csvDataExp);
      }
    }
  }, [cntperdistpermon]);

  const generateFileName = () => {
    const options = {
      // year: "numeric",
      // month: "2-digit",
      // day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedFromDate = new Date(dateTimeFrom).toLocaleString(
      undefined,
      options
    );
    const formattedToDate = new Date(dateTimeTo).toLocaleString(
      undefined,
      options
    );
    const formattedManufacturer = selectedManufacturer.replace(/ /g, "_");

    return `barchart_${formattedManufacturer}_${formattedFromDate}_${formattedToDate}.csv`;
  };

  const renderBarGraph = () => {
    if (hasErrors)
      return <p style={{ marginLeft: "2.5rem" }}>Unable to display data.</p>;

    const labels = cntperdistpermon.m10.labels;

    return (
      <Box
        id="barchart"
        sx={{
          minHeight: "500px",
          height: "600px",
          textAlign: "right",
        }}
      >
        {csvData && (
          <CSVLink
            data={csvData}
            filename={generateFileName()}
            className="export-link"
          >
            Export
          </CSVLink>
        )}
        {loading ? (
          <p style={{ marginRight: "2.5rem" }}>Loading...</p>
        ) : (
          <>
            {csvData && (
              <CSVLink
                data={csvData}
                filename={generateFileName()}
                className="export-link"
              >
                Export
              </CSVLink>
            )}
            <Bar
              options={options}
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "BELOW 10M",
                    data: cntperdistpermon.m10.data,
                    backgroundColor: "rgb(21, 168, 49)",
                  },
                  {
                    label: "10-20M",
                    data: cntperdistpermon.m20.data,
                    backgroundColor: "#fcd700",
                  },
                  {
                    label: "20-30M",
                    data: cntperdistpermon.m30.data,
                    backgroundColor: "#0412f5",
                  },
                ],
              }}
            />
          </>

        )}
      </Box>

    );
  };

  return <div>{renderBarGraph()}</div>;
};

export default BarGraph;
