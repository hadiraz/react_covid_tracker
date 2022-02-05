import React from 'react';

function InfoCards({info , color}) {
    const {value , title , total} = info ;
  return (
      <div className={`app_info-cards ${color}`}>

          <p className="app_info-card-title">
            {title}
          </p>

          <p className="app_info-card-number">
            {value}
          </p>

          <p className="app_info-card-total">
            {total} total
          </p>

      </div>
  );
}

export default InfoCards;
