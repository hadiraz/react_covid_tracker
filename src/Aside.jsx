import React from 'react';
import AsideGraph from './AsideGraph';
import AsideTable from './AsideTable';

function Aside({caseTypeMain}) {
  return (
      <aside>
        <AsideTable/>
        <AsideGraph caseTypeMain={caseTypeMain}/>
      </aside>
  );
}

export default Aside;
