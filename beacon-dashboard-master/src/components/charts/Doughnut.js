import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopTen, topTenSelector } from "slices/doughnut";
import { fetchManuCount } from "slices/circularprogress";
import { Chart as ChartJS, Legend, Title, Tooltip, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { dateTimeSelector } from "slices/datetime";
import { Doughnut } from "react-chartjs-2";
import { Spinner } from "react-bootstrap";
import "../css/charts.css";
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DoughnutChart = () => {
  const dispatch = useDispatch();
  const { toptenman, loading, hasErrors } = useSelector(topTenSelector);
  const { datetime } = useSelector(dateTimeSelector);

  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [loadingManuCount, setLoadingManuCount] = useState(false);
  const [manuCountData, setManuCountData] = useState({});
  const [errorManuCount, setErrorManuCount] = useState(false);
  const [codeLoc, setCodeLoc] = useState()

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    onClick: (event, item) => {
      if (item.length > 0) {
        // Handle click event
        const manufacturerName = item[0].index;

        // SET DATE AND TIME FORMAT
        var temp_f = new Date(datetime.startdate);
        temp_f.setSeconds(0);
        var tzoffset_f = (new Date(temp_f)).getTimezoneOffset() * 60000;
        var datetime_f = (new Date(temp_f - tzoffset_f)).toISOString().slice(0, -1);
        
        var temp_t = new Date(datetime.enddate);
        temp_t.setSeconds(0);
        var tzoffset_t = (new Date(temp_t)).getTimezoneOffset() * 60000;
        var datetime_t = new Date(temp_t - tzoffset_t).toISOString().slice(0, -1);

        const manufacturerData = toptenman.manufacturers[manufacturerName];

        console.log(item);
        console.log(manufacturerData);
        console.log(toptenman.manufacturers[manufacturerName]);

        // Redirect to the next page with the selected manufacturer data
        setSelectedManufacturer(manufacturerData);

        const ManufacturerData = encodeURIComponent(manufacturerData);
        const url = `/manufacturer?manufacturer=${ManufacturerData}&from=${datetime_f}&to=${datetime_t}&code=${codeLoc}`;
        window.location.href = url;
        // window.open(url, '_blank');
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "start",
        labels: {
          color: "#e8e8e8",
          usePointStyle: true,
          boxWidth: 10,
          padding: 16,
          margin: 16,
          fontSize: "15px",
        },
        margin: "8px",
      },
      title: {
        display: true,
        text: "Top 10 Device Manufacturer",
        font: {
          size: "14px",
        },
        color: "#e8e8e8",
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.label,
              currentValue = context.raw,
              total = context.chart._metasets[context.datasetIndex].total;

            var percentage = parseFloat(
              ((currentValue / total) * 100).toFixed(1)
            );

            return " " + percentage + "%";
          },
        },
      },
    },
  };


  useEffect(() => {

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to");

    setCodeLoc(code)

    if (dateTimeFrom && dateTimeTo) {
      dispatch(fetchTopTen(dateTimeFrom, dateTimeTo, code));
    }
    else if (datetime.startdate && datetime.enddate)
      dispatch(fetchTopTen(datetime.startdate, datetime.enddate, code));

  }, [dispatch, datetime]);


  const renderDoughnut = () => {
    const { loading = false, hasErrors = false } = toptenman;

    if (hasErrors) {
      return <p style={{ marginRight: "2.5rem" }}>No data.</p>;
    }

    return (
      <div id="donutchart" className="chart-container">
        {loading ? (
          <p style={{ marginRight: "2.5rem" }}>Loading...</p>
        ) : (
          <Doughnut
            selectedManufacturer={selectedManufacturer}
            setSelectedManufacturer={setSelectedManufacturer}
            options={options}
            // plugins={plugins}
            data={{
              labels: toptenman.manufacturers,
              datasets: [
                {
                  title: {
                    display: true,
                    text: "Top 10 Device Manufacturing",
                  },
                  data: toptenman.percentage,
                  backgroundColor: [
                    "rgb(132, 216, 255)",
                    "rgb(232, 85, 158)",
                    "rgb(255, 224, 91)",
                    "rgb(107, 232, 197)",
                    "rgb(199, 85, 255)",
                    "rgb(255, 135, 122)",
                    "rgb(0,36,253)",
                    "rgb(102, 255, 125)",
                    "rgb(232, 90, 159)",
                    "rgb(255, 230, 91)",
                  ],
                  borderWidth: 0,
                  hoverOffset: 5,
                  borderJoinStyle: "round",
                  spacing: 0,
                  position: "center",
                  color: "#e8e8e8",
                },
              ],
            }}
          />
        )}
      </div>
    );
  };

  return <div>{renderDoughnut()}</div>;
};

export default DoughnutChart;
