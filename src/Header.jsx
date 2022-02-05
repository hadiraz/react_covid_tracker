import { FormControl , MenuItem, Select } from '@material-ui/core';
import React , {useEffect, useState} from 'react';

function Header({cardData}) {
    const [countries , setCountries] = useState([]);
    const [selectedCountry , setSelectedCountry] = useState("worldwide");
    const apiUrlCountries = "https://disease.sh/v3/covid-19/countries" ;
    const apiUrlGlobal = "https://disease.sh/v3/covid-19/all" ;
    
    const changeCountry = (countryName) => {
        setSelectedCountry(countryName);
    }

    useEffect(()=>{
        const getCountryData = async() =>{
            await fetch(`${selectedCountry === "worldwide" ? apiUrlGlobal : `${apiUrlCountries}/${selectedCountry}`}`)
            .then(response => response.json())
            .then(data => cardData({todayDeath:data.todayDeaths , newCases:data.todayCases , todayRecovered:data.todayRecovered, totalRecovered:data.recovered , totalDeaths:data.deaths, totalCases:data.cases ,name:selectedCountry}))
        }
        getCountryData()
    },[selectedCountry])

    useEffect(()=>{
        const getData = async () => {
           await fetch(apiUrlCountries)
                .then(response =>  response.json())
                .then(data => {
                    const countries = data.map((value)=>{
                        return ({
                            name : value.country ,
                            iso2 : value.countryInfo.iso2
                        })
                    })

                    setCountries(countries) ;
                })
        }
        getData();
    },[])

  return (
      <header>
          <section className="app_header-left">
              Covid-19 Tracker
          </section>
          <section className="app_header-right">
              <FormControl className="app_header_form-controller">
                  <Select variant="outlined" value={selectedCountry} onChange={(e)=>changeCountry(e.target.value)}>
                      <MenuItem value="worldwide">
                        worldwide
                      </MenuItem>
                      {
                          countries.map((value,index)=>(
                            <MenuItem key={index} value={value.iso2}>
                                {value.name}
                            </MenuItem>
                          ))
                      }
                  </Select>
              </FormControl>
          </section>
      </header>
  );
}

export default Header;
