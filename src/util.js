import { circleMarker } from "leaflet";
import numeral from "numeral";
import React from "react";
import { Circle, CircleMarker, Popup } from "react-leaflet";
import { v4 as uuidv4 } from 'uuid';

const sortData = (data) =>{
    const sortedData = [...data] ;
    sortedData.sort((a , b)=>{
        if(a.cases > b.cases){
            return -1
        }else{
            return 1
        }
    })

    return sortedData ;
}

const mapDataDetail = {
    cases : {
        color : "orange" ,
        fillColor : "orange" ,
        radius : 120
    },
    recovered : {
        color : "yellowgreen" ,
        fillColor : "yellowgreen" ,
        radius : 130
    },
    deaths : {
        color : "#fff" ,
        fillColor : "red" ,
        radius : 100
    },

}

const showDataOnMap = (data , type="cases" , edit=false) => {  
    const {color , fillColor , radius} = mapDataDetail[type] ;
          const circleRefs = {} ;
          if(!edit){
            const allItems = data.map((value,index)=>{
             const itemRef= React.createRef();
             
             const circles = <CircleMarker
                     key = {uuidv4()} 
                     center={[value.countryInfo.lat , value.countryInfo.long]}
                     color= {color}
                     fillColor= {fillColor}
                     fillOpacity={0.4}
                     radius= {50}
                     ref={(ref)=>{
                        circleRefs[index] = ref
                     }}
                     >
                         <Popup>
                             <section className="popup-container">
                                 <section className="popup-top">
                                     <img src={value.countryInfo.flag} alt={value.countryInfo.country} />
                                 </section>
         
                                 <section className="popup-bottom">
                                     <h4>{value.country}</h4>
                                     <ul className="popup-country-list-data">
                                         <li>
                                             <p>cases : </p>
                                             <p>{numeral(value.cases).format("0,0")}</p>
                                         </li>
                                         <li>
                                             <p>deaths : </p>
                                             <p>{numeral(value.deaths).format("0,0")}</p>
                                         </li>
                                         <li>
                                             <p>recovered : </p>
                                             <p>{numeral(value.recovered).format("0,0")}</p>
                                         </li>
                                     </ul>
                                 </section>
         
                             </section>
                         </Popup>
                     </CircleMarker> ;
 
                       return circles
                     
             })
             return {items : allItems , refs : circleRefs}
          }else{
            data.map(value => {

            })
          }
}

export {sortData , showDataOnMap}