import React, { useState } from 'react';
import "./App.css" ;
import Aside from './Aside';
import Main from './Main';

function App() {
    const [caseTypeMain , setCaseTypeMain] = useState("cases");

  return (
      <>
      <Main setCaseTypeMain={setCaseTypeMain} />
      <Aside caseTypeMain={caseTypeMain}/>
      </>
  )
}

export default App;

