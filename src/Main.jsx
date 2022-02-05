import React , {useState} from 'react';
import Header from './Header';
import InfoCards from './InfoCards';
import Map from './Map';

function Main() {
    const [cardData , setCardData] = useState({todayDeath:"" , newCases:"" , todayRecovered:"" , totalRecovered:"" , totalDeaths:"" , totalCases:"" ,  name:""}) ;

    return (
    <main>
        <Header cardData={setCardData} />
        <section className="app_card-info-container">
            <InfoCards info={{title:"All Recovered" , value:cardData.todayRecovered , total:cardData.totalRecovered , name:cardData}} color="green"/>
            <InfoCards info={{title:"Today New Cases" , value:cardData.newCases , total:cardData.totalCases}} color="orange" />
            <InfoCards info={{title:"Today Deaths" , value:cardData.todayDeath , total:cardData.totalDeaths}} color="red"/>
        </section>
        <Map/>
    </main>
    );
}

export default Main;
