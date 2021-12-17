import React, { ReactElement, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Button, Col, Row, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import CalendarEventModal from './CalendarEventModal';
import { _findAllCalendarEvent } from '../../services/calendar/calendar.service';

const addDaysToday = (days = 0) => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result.toISOString().replace(/T.*$/, '');
};

let eventsData = [
  {
    id: uuidv4(),
    title: 'Crash Course',
    start: addDaysToday(5),
    end: addDaysToday(7),
    color: '#ff000',
    category: 'Education',
  },
  {
    id: uuidv4(),
    title: 'Sale Meetings',
    start: addDaysToday(-11),
    end: addDaysToday(-8),
    category: 'Work',
  },
  {
    id: uuidv4(),
    title: 'Birthday Party',
    start: `${addDaysToday(2)}T12:15:00`,
    category: 'Personal',
  },
  {
    id: uuidv4(),
    title: 'Link',
    start: `${addDaysToday(-3)}T12:00:00`,
    url: 'https://themeforest.net/user/coloredstrategies/portfolio/',
    category: 'Work',
  },
  {
    id: uuidv4(),
    title: 'Meeting',
    start: `${addDaysToday()}T10:30:00`,
    end: `${addDaysToday()}T12:30:00`,
    category: 'Education',
  },
  {
    id: uuidv4(),
    title: 'Lunch',
    start: `${addDaysToday()}T14:30:00`,
    end: `${addDaysToday()}T16:30:00`,
    category: 'Personal',
  },
  {
    id: uuidv4(),
    title: 'Dinner',
    start: `${addDaysToday()}T19:30:00`,
    end: `${addDaysToday()}T21:30:00`,
    category: 'Personal',
  },
  {
    id: uuidv4(),
    title: 'Meeting',
    start: `${addDaysToday(16)}T9:30:00`,
    end: `${addDaysToday(16)}T10:15:00`,
    category: 'Work',
  },
  {
    id: uuidv4(),
    title: 'React Course',
    start: addDaysToday(25),
    end: addDaysToday(29),
    category: 'Education',
  },
  {
    id: uuidv4(),
    title: 'Marketing Meetings',
    start: addDaysToday(-36),
    end: addDaysToday(-34),
    category: 'Work',
  },
  {
    id: uuidv4(),
    title: 'Vue.js Course',
    start: addDaysToday(35),
    end: addDaysToday(38),
    category: 'Education',
  },
  {
    id: uuidv4(),
    title: 'Lunch',
    start: `${addDaysToday(-19)}T14:30:00`,
    end: `${addDaysToday(-19)}T16:30:00`,
    category: 'Personal',
  },
  {
    id: uuidv4(),
    title: 'Dinner',
    start: `${addDaysToday(-21)}T19:30:00`,
    end: `${addDaysToday(-21)}T21:30:00`,
    category: 'Personal',
  },
  {
    id: uuidv4(),
    title: 'Dinner',
    start: `${addDaysToday(39)}T19:30:00`,
    end: `${addDaysToday(39)}T21:30:00`,
    category: 'Personal',
  },
  {
    id: uuidv4(),
    title: 'Lunch',
    start: `${addDaysToday(39)}T14:30:00`,
    end: `${addDaysToday(39)}T16:30:00`,
    category: 'Personal',
  },
];

const colorsMap = [
  { color: 'primary', category: 'Work' },
  { color: 'secondary', category: 'Education' },
  { color: 'tertiary', category: 'Personal' },
];

const themeValues = {
  primary: '#F6D7A7',
  secondary: '#C8E3D4',
  tertiary: '#577BC1',
};

function CustomCalendar(): ReactElement {
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState([]);
  const [dateTitle, setDateTitle] = useState('');
  const [selectedView, setSelectedView] = useState('dayGridMonth');
  const [isShowModalAddEdit, setIsShowModalAddEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    id: 0,
    title: 'New Event',
    start: '',
    end: '',
    category: '',
  });

  const onPrevButtonClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    console.log(new Date(calendarApi.view.currentStart),'currentMonthStart')
    setDateTitle(calendarApi.view.title);
  };

  const onNextButtonClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setDateTitle(calendarApi.view.title);
  };
  const onNewEventClick = () => {
    try {
      setIsShowModalAddEdit(true);
    } catch (e) {
      console.log('This action could not be completed');
    }
  };
  const viewDidMount = ({ view }: any) => {
    setDateTitle(view.title);
  };

  const changeView = (view: any) => {
    setSelectedView(view);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };
  const getToday = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
    }
  };

  // handlers for user actions
  // ------------------------------------------------------------------------------------------
  const handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo.view.calendar;
    setSelectedEvent({
      id: 0,
      title: 'New Event',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      category: '',
    });
    calendarApi.unselect(); // clear date selection
    try {
      setIsShowModalAddEdit(true);
    } catch (e) {
      console.log('This action could not be completed');
    }
  };

  const handleEventClick = (clickInfo: any) => {
    let targetEvent;
    const { id, url } = clickInfo.event;
    if (id) {
      targetEvent = events.find((_item : any) => _item.id.toString() === id);
      setSelectedEvent(targetEvent);
      setIsShowModalAddEdit(true);
    }
  };
  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

  const handleDates = (rangeInfo: any) => {
    try {
    } catch (e) {
      console.log('This action could not be completed');
    }
  };

  function handleCloseModal() {
    setIsShowModalAddEdit(false);
  }

  const handleEventChange = (changeInfo: any) => {
    try {
      const event = changeInfo.event.toPlainObject();
      const { id, start, title, end, extendedProps } = event;
    } catch (e) {
      console.log('This action could not be completed');
      changeInfo.revert();
    }
  };
  

  async function findAllCalendarEvent() {
    // let data = await _findAllCalendarEvent()
    const coloredEvents = eventsData.map((event) => {
      const coloredEvent = { ...event };
      if (event.category) {
        const foundColor = colorsMap.find(
          (x) => (x as any).category === event.category
        );
        if (foundColor) {
          coloredEvent.color = (themeValues as any)[foundColor.color];
        }
      }
      return coloredEvent;
    });
    setEvents(coloredEvents);
  }

  useEffect(() => {
    findAllCalendarEvent()
  

    return () => {};
  }, []);

  return (
    <div className='pb-10'>
      <Row justify='end' className='my-10 gap-5 mr-10' align='middle'>
        <Col className='flex gap-5'>
          <Button
            className='btn-icon btn-icon-start ms-1 w-100 w-md-auto'
            onClick={onPrevButtonClick}
          >
            Prev
          </Button>
          <Button
            className='btn-icon btn-icon-start ms-1 w-100 w-md-auto'
            onClick={onNextButtonClick}
          >
            Next
          </Button>
        </Col>
        <Col className='d-flex align-items-start justify-content-end'>
          <Button
            className='btn-icon btn-icon-start ms-1 w-100 w-md-auto'
            onClick={onNewEventClick}
            type='primary'
          >
            Add Event
          </Button>
        </Col>
        <Col>
          <Select
            onChange={(_value) => changeView(_value)}
            value={selectedView}
          >
            <Select.Option key='dayGridMonth' value='dayGridMonth'>
              Month
            </Select.Option>
            <Select.Option key='timeGridWeek' value='timeGridWeek'>
              Week
            </Select.Option>
            <Select.Option key='timeGridDay' value='timeGridDay'>
              Day
            </Select.Option>
          </Select>
        </Col>
        <Button
          className='btn-icon btn-icon-start ms-1 w-100 w-md-auto'
          onClick={getToday}
        >
          Today
        </Button>
      </Row>
      <div className='container mx-auto p-10'>
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrapPlugin,
          ]}
          headerToolbar={false}
          initialView='dayGridMonth'
          themeSystem='bootstrap'
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends
          locale={'th'}
          datesSet={handleDates}
          select={handleDateSelect}
          events={events}
          eventClick={handleEventClick}
          eventChange={handleEventChange} // called for drag-n-drop/resize
          viewDidMount={viewDidMount}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
          }}
        />
      </div>
      {isShowModalAddEdit && (
        <CalendarEventModal
          handleCloseModal={handleCloseModal}
          selectedEvent={selectedEvent}
        />
      )}
    </div>
  );
}

export default CustomCalendar;
