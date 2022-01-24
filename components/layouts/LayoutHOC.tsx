import React, { ReactElement } from 'react';
import Navbar from './Navbar';

interface Props {
  children: ReactElement;
}

function LayoutHOC({ children }: Props): ReactElement {
  return (
    <div style={{backgroundColor: '#faf9f8'}}>
      <Navbar />
      {children}
    </div>
  );
}

export default LayoutHOC;
