import React, { useEffect, useState } from 'react';
import {Chart as ChartJS , CategoryScale,LinearScale,PointElement , LineElement , Title , Tooltip , Legend , Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { numeral } from "numeral" ;

function AsideGraph() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend ,
        Filler
      );
    const [apiUrl , setApiUrl] = useState("");
    const [graphX , setGraphX] = useState([])
    const [graphY , setGraphY] = useState([])
    
    const sortGraphData = (data) =>{
        let newCases ;
        const graphX = [] ;
        const graphY = [] ;
        for(let date in data){
            if(newCases){
                newCases = data[date] - newCases ;
                graphX.push({x: date , y:newCases});
                graphY.push(newCases);
                newCases = data[date];
            }
            newCases = data[date] ;
        }
        return [graphX , graphY] ;
    }

    useEffect(()=>{
        const getGraphData = async()=>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=100")
        .then( response => response.json())
        .then( data => {
            const graphData = sortGraphData(data.cases);
                setGraphX(graphData[0]);
                setGraphY(graphData[1]);
                console.log(graphData)
        })
    }
    getGraphData();

    },[])

    // const options = {
    //     legend: {
    //       display: false,
    //     },
    //     elements: {
    //       point: {
    //         radius: 0,
    //       },
    //     },
    //     maintainAspectRatio: false,
    //     tooltips: {
    //       mode: "index",
    //       intersect: false,
    //       callbacks: {
    //         label: function (tooltipItem, data) {
    //           return numeral(tooltipItem.value).format("+0,0");
    //         },
    //       },
    //     },
    //     scales: {
    //       xAxes: [
    //         {
    //           type: "time",
    //           time: {
    //             format: "MM/DD/YY",
    //             tooltipFormat: "ll",
    //           },
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           gridLines: {
    //             display: false,
    //           },
    //           ticks: {
    //             // Include a dollar sign in the ticks
    //             callback: function (value, index, values) {
    //               return numeral(value).format("0a");
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   };

    useEffect(()=>{
        console.log(graphX , 1)
    },[graphX])

  return (
      <section className="aside_graph-container">
          <h3>worldwide new cases</h3>
            <Line data={{
                // labels: "graphX" , 

                datasets:[
                    {
                label: "cases" ,
                data : graphX ,
                borderColor : "#CC1034" ,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                fill : true , 
                tension : 0.1 ,
                borderWidth : "0" ,
                    }
        ]
            }}
           
            />
      </section>
  );
}

export default AsideGraph;
