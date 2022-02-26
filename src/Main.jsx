import React , {useEffect, useState} from 'react';
import Header from './Header';
import InfoCards from './InfoCards';
import CovMap from './CovMap';

function Main({setCaseTypeMain}) {
    const [cardData , setCardData] = useState({
        todayDeath:"" , 
        newCases:"" , 
        todayRecovered:"" , 
        totalRecovered:"" , 
        totalDeaths:"" , 
        totalCases:"" ,  
        name:"" , 
        lat:32 , 
        lng:53 , 
        caseType : "cases"
    }) ;

    return (
    <main>
        <Header setCardData={setCardData} cardData={cardData}/>

        <section className="app_card-info-container">

            <InfoCards onClick={()=>{
                setCardData({...cardData , caseType :("recovered")
                })
                setCaseTypeMain("recovered")
            }
            } 
                info={
                    {title:"All Recovered" , value:cardData.todayRecovered , total:cardData.totalRecovered , caseType : "recovered" , cardData : cardData , setCardData:setCardData}
                    } color="green"/>

            <InfoCards onClick={()=>{
                setCardData({...cardData , caseType : ("cases")});
                setCaseTypeMain("cases")
            }
                } 
                info={
                    {title:"Today New Cases" , value:cardData.newCases , total:cardData.totalCases , caseType : "cases" , cardData : cardData , setCardData:setCardData}
                    } color="orange" />

            <InfoCards onClick={()=>{
                setCardData({...cardData , caseType : ("deaths")})
                setCaseTypeMain("deaths")
            }
        } 
        info={
            {title:"Today Deaths" , value:cardData.todayDeath , total:cardData.totalDeaths , caseType : "deaths" , cardData : cardData , setCardData:setCardData}
            } color="red"/>

        </section>

        <CovMap centerMap={[cardData.lat , cardData.lng]} caseTypeProp={cardData.caseType}/>
    </main>
    );
}

export default Main;
