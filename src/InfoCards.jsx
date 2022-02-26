import numeral from 'numeral';
import React from 'react';

function InfoCards({info , color , onClick}) {
    const {value , title , total, caseType , cardData  , setCardData} = info ;
  return (
      <div onClick={onClick}  className={`app_info-cards ${color}`}>

          <p className="app_info-card-title">
            {title}
          </p>

          <p className="app_info-card-number">
            {numeral(value).format("0,0")}
          </p>

          <p className="app_info-card-total">
            {numeral(total).format("0.00a")} total
          </p>

      </div>
  );
}

export default InfoCards;
