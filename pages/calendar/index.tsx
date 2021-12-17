import React, { ReactElement } from 'react';
import LayoutHOC from '../../components/layouts/LayoutHOC';
import dynamic from 'next/dynamic';

const CustomCalendar = dynamic(
  () => import('../../components/calendar/CustomCalendar'),
  {
    ssr: false,
  }
);

function CalendarContainer(): ReactElement {
  return (
    <LayoutHOC>
      <CustomCalendar />
    </LayoutHOC>
  );
}

export default CalendarContainer;
