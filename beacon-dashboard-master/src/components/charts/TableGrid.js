import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevManu, devManuSelector } from "slices/tablegrid";
import { dateTimeSelector } from "slices/datetime";
import { Spinner } from "react-bootstrap";

const columns: GridColDef[] = [
  {
    field: "devices",
    headerName: "DEVICES",
    width: 200,
  },
  {
    id: "ID",
    field: "below10",
    headerName: "BELOW 10M",
    type: "number",
    width: 100,
    align: "center",
  },
  {
    id: "ID",
    field: "twentyM",
    headerName: "10-20M",
    type: "number",
    width: 100,
    align: "center",
  },
  {
    id: "ID",
    field: "thirtyM",
    headerName: "20-30M",
    type: "number",
    width: 100,
    align: "center",
  },
];

const MobileGrid = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { manuperdist, loading, hasErrors } = useSelector(devManuSelector);
  const { datetime } = useSelector(dateTimeSelector);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to");

    if (dateTimeFrom && dateTimeTo) {
      dispatch(fetchDevManu(dateTimeFrom, dateTimeTo, code));
    } else if (datetime.startdate && datetime.enddate)
      dispatch(fetchDevManu(datetime.startdate, datetime.enddate, code));
  }, [dispatch, datetime]);

  // GENERATE CSV EXPORT
  function CustomToolbar() {
    const { datetime } = useSelector(dateTimeSelector);

    const generateFileName = () => {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedFromDate = new Date(datetime.startdate).toLocaleString(
        undefined,options);
      const formattedToDate = new Date(datetime.enddate).toLocaleString(
        undefined,
        options
      );

      return `tablechart_${formattedFromDate}_${formattedToDate}.csv`;
    };

    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fileName: generateFileName(),
          }}
        />
      </GridToolbarContainer>
    );
  }

  const renderDevManu = () => {
    const options = {
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Device Manufacturer",
          font: {
            size: "16px",
          },
          color: "#e8e8e8",
          position: "top",
          marginBottom: "32px",
        },
      },
    };

    const rows = [];
    var count = 1;

    Object.keys(manuperdist).map((key) => {
      rows.push({
        id: count,
        devices: key,
        below10: `${manuperdist[key].m10}`,
        twentyM: `${manuperdist[key].m20}`,
        thirtyM: `${manuperdist[key].m30}`,
      });
      count++;
    });

    return (
      <Box sx={{ height: 570, width: "100%" }}>
        {loading && (
          <Spinner
            animation="border"
            variant="primary"
            style={{ marginLeft: "2.5rem" }}
          />
        )}
        {!loading && hasErrors && (
          <p
            style={{ marginLeft: "1rem", fontSize: "15px", marginTop: "-27px" }}
          >
            No data.
          </p>
        )}
        {!loading && !hasErrors && (
          <>
            <DataGrid
              options={options}
              sx={{
                ".MuiDataGrid-root": {
                  height: "100%",
                  marginTop: "-60px",
                },
                ".MuiDataGrid-columnHeader": {
                  paddingLeft: "16px",
                },
                ".MuiButtonBase-root": {
                  color: "#41b883",
                  fontSize: "13px",
                  paddingTop: "12px",
                },
                ".MuiTablePagination-displayedRows": {
                  marginBottom: 0,
                },
              }}
              slots={{ toolbar: CustomToolbar }}
              columns={columns}
              rows={rows}
              initialState={{
                pagination: { paginationModel: { pageSize: 8 } },
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </>
        )}
      </Box>
    );
  };

  return <div>{renderDevManu()}</div>;
};

export default MobileGrid;
