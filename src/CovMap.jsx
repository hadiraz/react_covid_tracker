import React, { useEffect, useState , useRef } from 'react';
import { Circle, CircleMarker, MapConsumer, MapContainer , TileLayer , Popup } from "react-leaflet";
import numeral from "numeral";
import "leaflet/dist/leaflet.css" ;
import {showDataOnMap} from "./util"

function CovMap({centerMap , caseTypeProp}) {
  const [allData , setAllData] = useState([]);
  const [caseType , setCaseType] = useState("cases");
  const [allCircles , setAllCircles] = useState([]) ;
  const [allRefs, setAllRefs] = useState({}) ;
  const mapDataDetail = {
    cases : {
        color : "orange" ,
        fillColor : "orange" ,
        radius : 10
    },
    recovered : {
        color : "yellowgreen" ,
        fillColor : "yellowgreen" ,
        radius : 10
    },
    deaths : {
        color : "red" ,
        fillColor : "red" ,
        radius : 250
    },

  }

  useEffect(()=>{
        fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const circles = showDataOnMap(data , caseTypeProp) ;
          setAllCircles(circles.items);
          setAllRefs(circles.refs);
          setAllData(data);
        })
  },[])

  useEffect(()=>{
    Object.keys(allRefs).map((key , index)=>{
      allRefs[key].setStyle({
        color : mapDataDetail[caseTypeProp].color ,
        fillColor : mapDataDetail[caseTypeProp].fillColor ,
        radius : Math.sqrt(mapDataDetail[caseTypeProp].radius*allData[key][caseTypeProp])/150
      })
    })
  },[caseTypeProp])


  return (
      <section className="app_map-container">
          <MapContainer className="map" center={centerMap} zoom={2} >
            <MapConsumer>
              {
                (map) =>{
                  map.setView(centerMap , 5);
                  return null
                }
              }
            </MapConsumer>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

          {
          allCircles.map((value , index) => {
              return value
          })
          }

          </MapContainer>
      </section>
  );
}

export default CovMap;
