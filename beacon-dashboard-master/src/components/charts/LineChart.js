import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLineGraph, lineGraphSelector } from "slices/linegraph";
import { dateTimeSelector } from "slices/datetime";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { saveAs } from "file-saver";
import "../css/charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Height } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 32,
        paddingRight: 16,
        marginBottom: 16,
        color: "rgb(232,232,232)",
      },
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
  },
};

const MultiLine = () => {
  const dispatch = useDispatch();
  const { cntlinegraph, loading, hasErrors } = useSelector(lineGraphSelector);
  const { datetime } = useSelector(dateTimeSelector);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, [dispatch, datetime]);

  const fetchData = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to");

    if (dateTimeFrom && dateTimeTo) {
      dispatch(fetchLineGraph(dateTimeFrom, dateTimeTo, code));
    } else if (datetime.startdate && datetime.enddate) {
      dispatch(fetchLineGraph(datetime.startdate, datetime.enddate, code));
    }
  };

  const exportToCsv = () => {
    const chart = chartRef.current;
    const datasets = chart.data.datasets;
    const labels = chart.data.labels;
    const csvData = [];

    // Generate CSV header
    const header = ["Date", ...datasets.map((dataset) => dataset.label)];
    csvData.push(header.join(","));

    // Generate CSV rows
    labels.forEach((label, index) => {
      const row = [label, ...datasets.map((dataset) => dataset.data[index])];
      csvData.push(row.join(","));
    });

    // Convert CSV data to a Blob
    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Generate the file name with the formatted datetime
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedFromDate = new Date(datetime.startdate).toLocaleString(
      undefined,
      options
    );
    const formattedToDate = new Date(datetime.enddate).toLocaleString(
      undefined,
      options
    );
    const fileName = `linechart_${formattedFromDate}_${formattedToDate}.csv`;

    // Trigger download
    saveAs(blob, fileName);
  };

  const renderLineGraph = () => {
    const { loading = false, hasErrors = false } = cntlinegraph;

    if (hasErrors) return <p style={{ marginRight: "2.5rem" }}>No data.</p>;

    const labels = cntlinegraph.line_10m.date;

    return (
      <div id="linechart" className="chart-container">
        {loading ? (
          <p style={{ marginRight: "2.5rem" }}>Loading...</p>
        ) : (
          <>
            <button onClick={exportToCsv}>EXPORT</button>
            <Line
              ref={chartRef}
              options={options}
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "BELOW 10M",
                    data: cntlinegraph.line_10m.count,
                    borderColor: "rgb(21, 168, 49)",
                    backgroundColor: "rgb(21, 168, 49)",
                    pointBackgroundColor: "rgb(232,232,232)",
                    tension: 0.4,
                  },
                  {
                    label: "10-20 METERS",
                    data: cntlinegraph.line_20m.count,
                    borderColor: "#0412f5",
                    backgroundColor: "#0412f5",
                    pointBackgroundColor: "rgb(232,232,232)",
                    tension: 0.4,
                  },
                  {
                    label: "20-30 METERS",
                    data: cntlinegraph.line_30m.count,
                    borderColor: "#e50914",
                    backgroundColor: "#e50914 ",
                    pointBackgroundColor: "rgb(232,232,232)",
                    tension: 0.4,
                  },
                ],
              }}
            />
          </>
        )}
      </div>
    );
  };

  return <div>{renderLineGraph()}</div>;
};

export default MultiLine;
