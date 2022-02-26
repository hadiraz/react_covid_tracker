import React, { useEffect, useState } from 'react';
import {sortData} from "./util";
import numeral from 'numeral';
import { v4 as uuidv4 } from 'uuid';
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
                            <tr key={uuidv4()}>
                                <td>
                                    <strong>
                                        {name}
                                    </strong>
                                </td>
                                <td>
                                    {numeral(cases).format("0,0")}
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
