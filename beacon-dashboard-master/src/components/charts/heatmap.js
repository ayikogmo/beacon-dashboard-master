import React, { useEffect, useState } from 'react';
import {
  Map,
  Marker,
  InfoWindow,
  Circle,
  GoogleApiWrapper
} from 'google-maps-react';
import "../css/charts.css";
import { fetchManuCount, manuCountSelector } from "slices/circularprogress";
import { fetchManu, manuSelector } from "slices/manufacturer";
import { useDispatch, useSelector } from "react-redux";
import billboard from './billboard.png';

const Heatmap = () => {

  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [codeLoc, setCodeLoc] = useState();

  // DISPATCH: FROM SLICE
  const dispatch = useDispatch();
  const { manucount, loading, hasErrors } =
    useSelector(manuCountSelector);
  const { manufacturer } = useSelector(manuSelector);
  const { dateTimeFrom, dateTimeTo } = useSelector(manuCountSelector)

  console.log(manucount.count_10m);
  console.log(manucount.count_20m);
  console.log(manucount.count_30m);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const manufacturerData = searchParams.get("manufacturer");
    const dateTimeFrom = searchParams.get("from");
    const dateTimeTo = searchParams.get("to")
    const code = searchParams.get("code")

    //console.log("code", code)


    setSelectedManufacturer(manufacturerData);
    setCodeLoc(code);


    if (manufacturerData && dateTimeFrom && dateTimeTo && code) {
      dispatch(fetchManuCount(manufacturerData, dateTimeFrom, dateTimeTo, code));
    }
  }, []);

  const count_10m = manucount.count_10m;
  const count_20m = manucount.count_20m;
  const count_30m = manucount.count_30m;

  function getCircleFillColor(count) {
    if (count >= 0 && count <= 10) {
      return '#F77780';
    } else if (count > 10 && count <= 20) {
      return '#EC6A72';
    } else if (count > 20 && count <= 30) {
      return '#E05D64';
    } else if (count > 30 && count <= 40) {
      return '#D54F55';
    } else if (count > 40 && count <= 50) {
      return '#CA4247';
    } else if (count > 50 && count <= 60) {
      return '#BE3539';
    } else if (count > 60 && count <= 70) {
      return '#B3282B';
    } else if (count > 70 && count <= 80) {
      return '#A81A1C';
    } else if (count > 80 && count <= 90) {
      return '#9C0D0E';
    } else if (count > 90 && count <= 100) {
      return '#910000';
    } else {
      return 'white';
    }
  }

  const circleFillColor10m = getCircleFillColor(count_10m);
  const circleFillColor20m = getCircleFillColor(count_20m);
  const circleFillColor30m = getCircleFillColor(count_30m);


  const circles = [
    { radius: 30, fillColor: circleFillColor30m, fillOpacity: 0.8 },
    { radius: 20, fillColor: circleFillColor20m, fillOpacity: 0.6 },
    { radius: 10, fillColor: circleFillColor10m, fillOpacity: 0.4 }
  ];

  const locations = [
    { lat: 14.551508742727274, lng: 121.04759731479612 }, //BGC
    { lat: 14.551001157733756, lng: 121.05582884945552 }, //C5-SB //placeholder is at MarketMarket
    { lat: 14.547586177103467, lng: 121.05460722926816 }, //C5-NB //placeholder is at SM Aura
    { lat: 14.55629553309647, lng: 121.00469665126556 },  //Buendia-SB //placeholder is at United Neon
    { lat: 14.589845472034416, lng: 121.05746513000517 }, //Guadix Gantry
    { lat: 14.584816330575128, lng: 121.0555940980911 },  //MegamallGantry
    { lat: 14.559926517285149, lng: 121.01182353295376 }  //Buendia-NB //placeholder is at Chino Roces intersection

  ];


  const markerLocation =
    codeLoc == "3D-LED" ? locations[0]                    //LED-BGC
      : codeLoc == "C5-SB" ? locations[1]                 //C5-SB //placeholder
        : codeLoc == "C5-NB" ? locations[2]               //C5-NB
          : codeLoc == "Gantry-0002" ? locations[3]       //Buendia-SB //placeholder
            : codeLoc == "Gantry-0003" ? locations[4]     //Guadix Gantry
              : codeLoc == "Gantry-0004" ? locations[5]   //MegamallGantry
                : codeLoc == "Gantry-0012" ? locations[6] //Buendia-NB //placeholder
                  : locations[3];                         //OneAyala


  const style = {
    position: 'relative',
    width: '1235px',
    height: '500px'
  };

  const renderHeatmap = (
    <div id="heatmap">
      <Map
        google={window.google}
        zoom={20}
        center={markerLocation}
        style={style}
      >
        <Marker
          position={markerLocation}
          icon={{
            url: billboard,
            scaledSize: new window.google.maps.Size(50, 50)
          }}
        />


        {locations.map((location, locationIndex) => (
          circles.map((circle, circleIndex) => (
            <Circle
              key={`${locationIndex}-${circleIndex}`}
              center={location}
              radius={circle.radius}
              fillColor={circle.fillColor} fillOpacity={circle.fillOpacity}
              strokeColor='#F77780'
              strokeOpacity={0.3}
              strokeWeight={2}

            />
          ))
        ))}
      </Map>
    </div >
  );

  return <div>{renderHeatmap}</div>
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDGI7cESsMsVCFdLVroObdwtdM3M0w7f4c',
  version: '3.31'
})(Heatmap);
