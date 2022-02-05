import React from 'react';
import AsideGraph from './AsideGraph';
import AsideTable from './AsideTable';

function Aside() {
  return (
      <aside>
        <AsideTable/>
        <AsideGraph/>
      </aside>
  );
}

export default Aside;
