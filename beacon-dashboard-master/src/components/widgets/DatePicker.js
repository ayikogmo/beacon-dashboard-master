import { useEffect, useState } from "react";
// import { DateTimePicker } from 'react-datetime-picker';
import { TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDateTime, dateTimeSelector } from "slices/datetime";
// import { addDays } from "date-fns";


import { SxProps } from "@mui/system";
// import DataChart from "components/charts/DataChart";
import "../css/charts.css";

const DatePickers = () => {
  const dispatch = useDispatch();
  const [codeLoc, setCodeLoc] = useState()
  const { datetime } = useSelector(dateTimeSelector);
  const navigate = useNavigate();


  var temp_start = new Date();
  temp_start.setHours(0);
  temp_start.setMinutes(0);
  temp_start.setSeconds(0);



// STORE DATE & TIME  

  const [startDate, setStartDate] = useState(()=> {
    const storedValue = localStorage.getItem("startDate");
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    return storedValue ? new Date(storedValue) : yesterday;
  });

  const [endDate, setEndDate] = useState(() => {
    const storedValue = localStorage.getItem("endDate");
    return storedValue ? new Date(storedValue) : temp_start;
  }) ;

  useEffect(() => {
    console.log("TEEEEEEEEEST")
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to");
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);


    // Parse to Date
    const parsedStartDate = dateTimeFrom ? new Date(dateTimeFrom) : yesterday;
    const parsedEndDate = dateTimeTo ? new Date(dateTimeTo) : temp_start;

    setStartDate(parsedStartDate);
    setEndDate(parsedEndDate);

    dispatch(
      fetchDateTime({
        startdate: parsedStartDate.toISOString(),
        enddate: parsedEndDate.toISOString(),
        code
      })
    );
  }, [dispatch])


  
// HANDLE CLICK EVENT
  const handleChange = (newValue) => {
    setStartDate(newValue);
  };

  const newChange = (newValue) => {
    setEndDate(newValue);
  };


const handleFetchData = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const code = searchParams.get("code")

  setCodeLoc(code)

  // SET DATE AND TIME FORMAT
  var temp_f = new Date(startDate);
  temp_f.setSeconds(0);
  var tzoffset_f = (new Date(temp_f)).getTimezoneOffset() * 60000;
  var datetime_f = (new Date(temp_f - tzoffset_f)).toISOString().slice(0, -1);
  
  var temp_t = new Date(endDate);
  temp_t.setSeconds(0);
  var tzoffset_t = (new Date(temp_t)).getTimezoneOffset() * 60000;
  var datetime_t = new Date(temp_t - tzoffset_t).toISOString().slice(0, -1);

  localStorage.setItem("startDate", datetime_f);
  localStorage.setItem("endDate", datetime_t);

  navigate(`/dashboard?code=${code}&from=${datetime_f}&to=${datetime_t}`);
  dispatch(
    fetchDateTime({
      startdate: datetime_f,
      enddate: datetime_t,
      code
    })
  );
};


  const handleClick = () => {
    handleFetchData();
  };



  // Styling DatePicker - use of SxProps
  const popperSx: SxProps = {
    ".css-epd502": {
      width: "320px",
    },
    "& .MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
      backgroundColor: "#41b883",
    }
    // "& .MuiPaper-root": {
    //   color: "#393b4c",
    //   border: "1px solid #1c2038",
    //   padding: 0,
    //   marginTop: 1,
    //   backgroundColor: "#e8e8e8",
    // },
    // "& .MuiDialogContent-root": {
    //   backgroundColor: "#e8e8e8",
    //   color: "#393b4c",
    // },
    // "& .MuiCalendarPicker-root": {
    //   backgroundColor: "#e8e8e8",
    //   borderRadius: "8px",
    //   width: "316px",
    //   marginLeft: "0px",
    //   color: "#393b4c",
    // },
    // "& .MuiPickersCalendarHeader-root": {
    //   paddingLeft: "35px",
    // },
    // "& .MuiPickersCalendarHeader-label": {
    //   fontSize: "14px",
    // },
    // "& .MuiTypography-root-MuiDayPicker-weekDayLabel": {
    //   fontSize: "13px",
    //   color: "#393b4c",
    // },
    // "& .PrivatePickersSlideTransition-root": {},
    // "& .PrivatePickersMonth-root:hover": {
    //   backgroundColor: "#41b883",
    // },
    // "& .PrivatePickersMonth-root.Mui-selected": {
    //   backgroundColor: "#41b883",
    // },
    // "& .PrivatePickersMonth-root.Mui-active": {
    //   backgroundColor: "#41b883",
    //   color: "#e8e8e8",
    // },
    // "& .MuiTypography-root": {
    //   width: "34px",
    //   fontSize: "14px",
    //   color: "#393b4c",
    // },
    // "& .MuiPickersDay-dayWithMargin": {
    //   color: "#393b4c",
    //   backgroundColor: "transparent",
    //   margin: "1px",
    //   padding: "1px",
    //   width: "35px",
    //   height: "35px",
    // },
    // "& .MuiPickersDay-dayWithMargin:hover": {
    //   backgroundColor: "#41b883",
    // },
    // "& .MuiPickersDay-dayWithMargin.Mui-selected": {
    //   backgroundColor: "#41b883",
    // },

    // "& .MuiTabs-root": { backgroundColor: "rgba(120, 120, 120, 0.4)" },

    // // ICONS
    // ".css-1rqusr7-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon": {
    //   color: "#393b4c",
    // },

    // ".css-havevq-MuiSvgIcon-root": {
    //   color: "#393b4c",
    // },

    // // Year Selection
    // ".css-3eghsz-PrivatePickersYear-button": {
    //   margin: "8px 0",
    //   height: "32px",
    //   width: "64px",
    //   fontSize: "14px",
    // },
    // ".css-3eghsz-PrivatePickersYear-button.Mui-selected": {
    //   backgroundColor: "#41b883",
    // },

    // // Clocker Style
    // ".MuiClockNumber-root": {
    //   fontSize: "14px",
    //   color: "#393b4c",
    // },
    // ".MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton": {
    //   backgroundColor: "#41b883",
    // },
    // ".MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton:hover": {
    //   backgroundColor: "#41c889",
    // },
    // ".MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton": {
    //   backgroundColor: "#41b889",
    // },
    // ".MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton:hover": {
    //   backgroundColor: "#41c889",
    //   color: "#e8e8e8",
    // },
    // ".css-umzx0k-MuiClock-pin": {
    //   backgroundColor: "#41c883",
    // },
    // ".MuiClockPointer-root": {
    //   backgroundColor: "#41b883",
    // },
    // ".MuiClockPointer-thumb": {
    //   border: "16px solid #41b883",
    // },
    // "& MuiPopper-root-MuiPickersPopper-root .css-12t0dn4-MuiClockPointer-thumb":
    //   {
    //     backgroundColor: "#e8e8e8",
    //   },
    // "& MuiPopper-root-MuiPickersPopper-root .MuiTypography-root-selected": {
    //   width: "34px",
    //   fontSize: "14px",
    //   color: "#e8e8e8",
    // },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        id="FromDate"
        label={"From"}
        value={startDate}
        onChange={handleChange}
        disableFuture
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              ".MuiInputBase-root": {
                width: "92%",
                fontSize: "13.5px",
                borderRadius: "9px",
                paddingLeft: "4px",
                paddingRight: "20px",
                backgroundColor: "#252b48",
              },
              ".MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "16px 8px;",
                margin: "0",
              },
              ".css-1kjngfk-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#41b883",
                },
              ".css-1kjngfk-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#41b883",
                },
              ".MuiInputBase-input": {
                color: "#",
                height: "8px",
              },
              ".MuiFormLabel-root": {
                color: "#6c757d",
              },
              ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                color: "#41b883",
              },
            }}
          />
        )}
        showDaysOutsideCurrentMonth
        componentsProps={{
          textField: {
            InputProps: {
              sx: {
                "& .MuiSvgIcon-root": { color: "#41b883" },
                "& .MuiFormLabel-root": { color: "#e8e8e8" },
              },
            },
          },

          popper: {
            sx: popperSx,
          },
        }} />
      <DateTimePicker
        id="ToDate"
        label="To"
        value={endDate}
        onChange={newChange}
        disableFuture
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              ".MuiInputBase-root": {
                width: "92%",
                fontSize: "13.5px",
                borderRadius: "9px",
                paddingLeft: "4px",
                paddingRight: "20px",
                backgroundColor: "#252b48",
              },
              ".MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "16px 8px;",
                margin: "0",
              },
              ".css-1kjngfk-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#41b883",
                },
              ".css-1kjngfk-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#41b883",
                },
              ".MuiInputBase-input": {
                color: "#e8e8e8",
                height: "8px",
              },
              ".MuiFormLabel-root": {
                color: "#6c757d",
              },
              ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                color: "#41b883",
              },
            }}
          />
        )}
        showDaysOutsideCurrentMonth
        componentsProps={{
          textField: {
            InputProps: {
              sx: {
                "& .MuiSvgIcon-root": { color: "#41b883" },
                "& .MuiFormLabel-root": { color: "#e8e8e8" },
              },
            },
          },

          popper: {
            sx: popperSx,
          },
        }} />
      <Button
        onClick={handleClick}
        id="datetimebtn"
        sx={{
          backgroundColor: "#41b883",
          borderRadius: "8px",
          width: "20%",
          marginLeft: "0px",
          color: "#ffff",
          lineHeight: "25px",
          fontWeight: "500",

          "&:hover": {
            color: "#ffff",
            // border: "1px solid",
            backgroundColor: "#4ED79A",
            boxShadow: "rgba(200,211,213, 0.2) 0px 2px 15px 0px",
          },
        }}
      >
        Apply
      </Button>
    </LocalizationProvider>
  );
};

export default DatePickers;

