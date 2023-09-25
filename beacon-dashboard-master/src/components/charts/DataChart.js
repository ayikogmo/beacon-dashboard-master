import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenCount, genCountSelector } from "slices/gencount";
import { dateTimeSelector, fetchDateTime } from "slices/datetime"
import { useLocation } from "react-router-dom";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import { FaArrowUp, FaArrowDown} from "react-icons/fa"
import "../css/charts.css";


const DataChart = () => {
  
  // DISPATCH: FROM SLICE
  const dispatch = useDispatch();
  const { gencount, loading, hasErrors } = useSelector(genCountSelector);
  const {datetime} = useSelector(dateTimeSelector);

  // FOR DATE AND LOC CODE
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get("code")
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to");

    console.log("DATETIMEZ: ", datetime);
    console.log("strt:", datetime.startdate);
    console.log("end:", datetime.enddate);

    if (dateTimeFrom && dateTimeTo) {
      console.log("kshdfjsh")
      dispatch(fetchGenCount(dateTimeFrom, dateTimeTo, code));
    }
    else if (datetime.startdate && datetime.enddate)
      dispatch(fetchGenCount(datetime.startdate, datetime.enddate, code));
    else
      console.log("no date")
  }, [dispatch, datetime]);



  const renderGenCount = () => {

    // ADDING ARROW TO DATA
    let changeOverallClass = '';
    let change30Class = '';
    let change20Class = '';
    let change10Class = '';
    let genArrowOverall = null;
    let genArrow10 = null;
    let genArrow20 = null;
    let genArrow30 = null;



    if (parseFloat(gencount.change_30m) < 0) {
      change30Class = 'negative-change';
      genArrow30 = <FaArrowDown />;


    } else if (parseFloat(gencount.change_30m) > 0) {
      change30Class = 'positive-change';
      genArrow30 = <FaArrowUp />;
    } 

    if (parseFloat(gencount.change_10m) < 0) {
      change10Class = 'negative-change';
      genArrow10 = <FaArrowDown />;

    } else if (parseFloat(gencount.change_10m) > 0) {
      change10Class = 'positive-change';
      genArrow10 = <FaArrowUp />;
    }

    if (parseFloat(gencount.change_20m) < 0) {
      change20Class = 'negative-change';
      genArrow20 = <FaArrowDown />;

    } else if (parseFloat(gencount.change_20m) > 0) {
      change20Class = 'positive-change';
      genArrow20 = <FaArrowUp />;
    }


    if (parseFloat(gencount.change_overall) < 0) {
      changeOverallClass = 'negative-change';
      genArrowOverall = <FaArrowDown style={{fontSize: "20px"}} />;

    } else if (parseFloat(gencount.overall) > 0) {
      changeOverallClass = 'positive-change';
      genArrowOverall = <FaArrowUp style={{fontSize: "20px"}} />;
    }


      
  return (
    <Row id="datarow" xs={1} md={2} className="g-4">
      <Col>
        <Card>
          <Card.Body>
            <Card.Subtitle className="mb-2 mt-1 text-muted">
              OVERALL DATA
            </Card.Subtitle>
            {loading && <Spinner animation="border" variant="primary" style={{marginTop: "40px", display: "flex", marginRight: "auto", marginLeft: "auto"}}/>}
            {!loading && hasErrors && <p style={{marginTop: "48px"}}>No data.</p> }
            {!loading && !hasErrors && gencount && (
            <>
              <Card.Title>{gencount.overall}</Card.Title>
              {gencount.change_overall !== "No data" ? (
                <Card.Text className={changeOverallClass}>
                  {genArrowOverall} {`${gencount.change_overall}%`}
                </Card.Text>
              ) : (
                <Card.Text className={changeOverallClass}  style={{color:"#e8e8e8"}}>
                  {gencount.change_overall}
                </Card.Text>
              )}
              <Card.Footer className="text-muted">{gencount.text}</Card.Footer>
            </>
          )}
          </Card.Body>
        </Card>
      </Col>

      {/* 10 METERS START */}
      <Col>
        <Card>
          <Card.Body>
            <Card.Subtitle className="mb-2 mt-1 text-muted">
              BELOW 10 METERS
            </Card.Subtitle>
            {loading && <Spinner animation="border" variant="primary" style={{marginTop: "40px", display: "flex", marginRight: "auto", marginLeft: "auto"}}/>}
            {!loading && hasErrors && <p style={{marginTop: "48px"}}>No data.</p> }
            {!loading && !hasErrors && gencount && (
            <>

              <Card.Title>{gencount.count_10m}</Card.Title>
              {gencount.change_10m !== "No data" ? (
                <Card.Text className={change10Class}>
                  {genArrow10} {`${gencount.change_10m}%`}
                </Card.Text>
              ) : (
                <Card.Text className={change10Class}>
                  {gencount.change_10m}
                </Card.Text>
              )}
              <Card.Footer className="text-muted">{gencount.text}</Card.Footer>
            </>
          )}
          </Card.Body>
        </Card>
      </Col>

      {/* 20 METERS START */}
      <Col>
        <Card>
          <Card.Body>
            <Card.Subtitle className="mb-2 mt-1 text-muted">
              10-20 METERS
            </Card.Subtitle>
            {loading && <Spinner animation="border" variant="primary" style={{marginTop: "40px", display: "flex", marginRight: "auto", marginLeft: "auto"}} />}
            {!loading && hasErrors && <p style={{marginTop: "48px"}}>No data.</p> }
            {!loading && !hasErrors && gencount && (
            <>
              <Card.Title>{gencount.count_20m}</Card.Title>
              {gencount.change_20m !== "No data" ? (
                <Card.Text className={change20Class}>
                  {genArrow20} {`${gencount.change_20m}%`}
                </Card.Text>
              ) : (
                <Card.Text className={change20Class}>
                  {gencount.change_20m}
                </Card.Text>
              )}
              <Card.Footer className="text-muted">{gencount.text}</Card.Footer>
            </>
          )}
          </Card.Body>
        </Card>
      </Col>

      {/* 30 METERS START */}
      <Col>
        <Card>
          <Card.Body>
            <Card.Subtitle className="mb-2 mt-1 text-muted">
              20-30 METERS
            </Card.Subtitle>
            {loading && <Spinner animation="border" variant="primary" style={{marginTop: "40px", display: "flex", marginRight: "auto", marginLeft: "auto"}}/>}
            {!loading && hasErrors && <p style={{marginTop: "48px"}}>No data.</p> }
            
            {!loading && !hasErrors && gencount && (
            <>
              <Card.Title>{gencount.count_30m}</Card.Title>
              {gencount.change_30m !== "No data" ? (
                <Card.Text className={change30Class}>
                  {genArrow30} {`${gencount.change_30m}`}
                </Card.Text>
              ) : (
                <Card.Text className={change30Class}>
                  {gencount.change_30m}
                </Card.Text>
              )}
              <Card.Footer className="text-muted">{gencount.text}</Card.Footer>
            </>
          )}

          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
  };

  return <div>{renderGenCount()}</div>;

};

export default DataChart;
