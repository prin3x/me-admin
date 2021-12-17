import React, { ReactElement } from 'react';
import Navbar from './Navbar';

interface Props {
  children: ReactElement;
}

function LayoutHOC({ children }: Props): ReactElement {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default LayoutHOC;
