import React, { ReactElement, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'; // a plugin!
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
//
import { Button, Col, Form, message, Row, Select } from 'antd';
import { useEffect } from 'react';
import {
  _deleteEvent,
  _findAllCalendarEvent,
  _getAllCategories,
  _makeNewEvent,
  _updateEvent,
} from '../../services/calendar/calendar.service';
import {
  MakeNewsDto,
  ModalEditType,
} from '../../services/calendar/calendar.model';
import { useQueryClient, useQuery } from 'react-query';
import { CALENDAR_EVENT } from '../../services/calendar/calendar.queryKey';
import moment from 'moment';

const colorsMap = [
  { color: 'primary', category: 'event', categoryId: 2 },
  { color: 'secondary', category: 'other', categoryId: 3 },
  { color: 'tertiary', category: 'Personal', categoryId: 1 },
];

const themeValues = {
  primary: '#F6D7A7',
  secondary: '#C8E3D4',
  tertiary: '#577BC1',
};

function RoomBookingCalendar(): ReactElement {
  const queryClient = useQueryClient();
  const calendarRef = useRef<any>(null);
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [dateTitle, setDateTitle] = useState('');
  const [isShowTime, setIsShowTime] = useState(true);
  const [selectedView, setSelectedView] = useState('dayGridMonth');
  const [isShowModalAddEdit, setIsShowModalAddEdit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    id: 0,
    title: 'New Event',
    dateTime: [],
    categoryId: 0,
    modalType: ModalEditType.MAKE_EVENT,
  });
  const [categories, setCategories] = useState([]);
  //   const { data, isLoading, isSuccess } = useQuery(
  //     [CALENDAR_EVENT],
  //     _findAllCalendarEvent
  //   );

  async function deleteEvent(id) {
    setIsProcessing(true);
    try {
      await _deleteEvent(id);
      queryClient.invalidateQueries(CALENDAR_EVENT);
      message.success('DONE');
    } catch (e) {
      console.error(e);
      message.error('Error');
    }
    setIsProcessing(false);
    setIsShowModalAddEdit(false);
  }

  async function makeNewEvent() {
    let res;
    let payload: MakeNewsDto = {} as MakeNewsDto;
    let formRes;
    setIsProcessing(true);
    try {
      formRes = await form.validateFields();
      console.log(formRes.dateTime?.[0], 'formRes');
      payload.categoryId = formRes?.categoryId;
      payload.content = formRes?.content || '';
      payload.title = formRes?.title || '';
      payload.start =
        formRes?.dateTime?.[0].format(isShowTime ? null : 'YYYY-MM-DD') ||
        moment().format();
      payload.end =
        formRes?.dateTime?.[1].format(isShowTime ? null : 'YYYY-MM-DD') ||
        moment().format();
      res =
        selectedEvent.modalType === ModalEditType.MAKE_EVENT
          ? await _makeNewEvent(payload)
          : await _updateEvent(selectedEvent.id, payload);
      queryClient.invalidateQueries(CALENDAR_EVENT);
      message.success('Done');
    } catch (e) {
      console.error(e);
      message.error('Error');
    }
    setIsProcessing(false);
    setIsShowModalAddEdit(false);
    return res;
  }

  const onPrevButtonClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    console.log(new Date(calendarApi.view.currentStart), 'currentMonthStart');
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
      title: '',
      dateTime: [moment(selectInfo.startStr), moment(selectInfo.endStr)],
      categoryId: 0,
      modalType: ModalEditType.MAKE_EVENT,
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
      targetEvent = events.find((_item: any) => _item.id.toString() === id);
      console.log(targetEvent, targetEvent);
      setSelectedEvent({
        ...targetEvent,
        dateTime: [moment(targetEvent.start), moment(targetEvent.end)],
        modalType: ModalEditType.EDIT_EVENT,
      });
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

  //   async function findAllCalendarEvent() {
  //     const coloredEvents = data.map((event) => {
  //       const coloredEvent = { ...event };
  //       if (event.categoryId) {
  //         const foundColor = colorsMap.find(
  //           (x) => (x as any).categoryId === event.categoryId
  //         );
  //         if (foundColor) {
  //           coloredEvent.color = (themeValues as any)[foundColor.color];
  //         }
  //       }
  //       return coloredEvent;
  //     });
  //     setEvents(coloredEvents);
  //   }

  function toggleShowTime() {
    setIsShowTime((prev) => !prev);
  }

  async function fetchAllCategories() {
    let res;

    try {
      res = await _getAllCategories();
      setCategories(res);
    } catch (e) {
      console.error(e);
    }

    return res;
  }

  //   useEffect(() => {
  //     if (isSuccess) {
  //       fetchAllCategories();
  //       findAllCalendarEvent();
  //     }
  //     return () => {};
  //   }, [data]);

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
      <div className='container mx-auto px-20 py-10'>
        <FullCalendar
          ref={calendarRef}
          schedulerLicenseKey='0261586002-fcs-1640591838'
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrapPlugin,
            resourceTimelinePlugin,
            resourceTimeGridPlugin,
          ]}
          headerToolbar={false}
          initialView='resourceTimeGridDay'
          themeSystem='bootstrap'
          resources={[
            {
              id: 'a',
              title: 'Room A',
            },
            {
              id: 'b',
              title: 'Room B',
            },
          ]}
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends
          locale={'th'}
          datesSet={handleDates}
          select={handleDateSelect}
          events={[
            {
              id: '1',
              resourceIds: ['a'],
              title: 'Meeting',
              start: '2022-01-03',
              end: '2022-01-04',
            },
          ]}
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
    </div>
  );
}

export default RoomBookingCalendar;
