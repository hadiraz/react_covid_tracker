import React, { useEffect, useState } from 'react';
import {Chart as ChartJS , CategoryScale,LinearScale,PointElement , LineElement , Title , Tooltip , Legend , Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { numeral } from "numeral" ;

function AsideGraph({caseTypeMain}) {
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
    const [graphX , setGraphX] = useState([])
    const [graphY , setGraphY] = useState([])
    const [allData , setAllData] = useState([])
    const [empty , setEmpty] = useState(0)

    const sortGraphData = (data) =>{
        let newCases ;
        const graphX = [] ;
        const graphY = [] ;
        for(let date in data){
            if(newCases !== 0 && data[date] !==0){
                newCases = data[date] - newCases ;
                graphX.push(date);
                graphY.push(newCases);
                newCases = data[date];
            }else{
                graphX.push();
                graphY.push();
            }
            newCases = data[date] ;
        }
        return [graphX , graphY] ;
    }

    useEffect(()=>{
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=100")
        .then( response => response.json())
        .then( data => {
            const graphData = sortGraphData(data[caseTypeMain]);
                setGraphX(graphData[0]);
                setGraphY(graphData[1]);
                setAllData(data)
        })
    },[])

    useEffect(()=>{
        const graphData = sortGraphData(allData[caseTypeMain]);
            setGraphX(graphData[0]);
            setGraphY(graphData[1]);
    },[caseTypeMain])

  return (
      <section className="aside_graph-container">
          <h3>worldwide new {caseTypeMain}</h3>
          {
              graphX.length > 0 ? <Line data={{
                labels: graphX , 

                datasets:[
                    {
                label: caseTypeMain ,
                data : graphY ,
                borderColor : "rgba(204, 16, 52, 1)" ,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                fill : true , 
                tension : 0.1 ,
                borderWidth : "0" ,
                    }
        ]
            }}
           
            /> : <h4>Sorry data not found !</h4>
          }
            
      </section>
  );
}

export default AsideGraph;
