import React, { useEffect, useState } from 'react';
import {sortData} from "./util";
function AsideTable() {
    const [tableData , setTableData] = useState([]) ;
    const apiUrlCountries = "https://disease.sh/v3/covid-19/countries" ;

    useEffect(()=>{
        const getTableData = async() =>{
            await fetch(apiUrlCountries)
            .then(response => response.json())
            .then(data => {
                const countriesData = data.map((value,index)=>{
                    return {name:value.country , cases : value.cases}
                })
                const sortedData = sortData(countriesData) ;
                setTableData(sortedData) ;
            })
            console.log(tableData);
        }

        getTableData();

    },[])

  return (
      <section className="aside_table-container">
            <h4>Live Cases By Country</h4>
            <table className="aside_table">
                <tbody>
                    {
                        tableData.map(({name , cases} , index)=>{
                            return(
                            <tr key={index}>
                                <td>
                                    <strong>
                                        {name}
                                    </strong>
                                </td>
                                <td>
                                    {cases}
                                </td>
                            </tr>

                            )
                        })
                    }
                    
                </tbody>
            </table>
      </section>
      
  );
}

export default AsideTable;
