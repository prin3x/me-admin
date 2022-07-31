import React, { ReactElement, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // a plugin!
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
//
import { Button, Col, Form, message, Row, Select } from "antd";
import { useEffect } from "react";
import CalendarEventModal from "./CalendarEventModal";
import {
  _deleteEvent,
  _findAllCalendarEvent,
  _getAllCategories,
  _makeNewEvent,
  _updateEvent,
} from "../../services/calendar/calendar.service";
import {
  ECalendarEventType,
  ListQueryCalendarDTO,
  MakeNewsDto,
  ModalEditType,
} from "../../services/calendar/calendar.model";
import { useQueryClient, useQuery } from "react-query";
import { CALENDAR_EVENT } from "../../services/calendar/calendar.queryKey";
import moment from "moment";
import CalendarListFetcher from "./CalendarListFetcher";

function createArrayOfYear(): number[] {
  const resultArr: number[] = [];
  const currentYearPlusOne = Number(moment().add(2, "year").format("YYYY"));

  for (let i = 1; i < 11; i++) {
    const n = currentYearPlusOne - i;
    resultArr.push(n);
  }

  return resultArr;
}

const colorsMap = [
  { color: "primary", categoryName: ECalendarEventType.EVENT },
  { color: "secondary", categoryName: ECalendarEventType.BIRTHDAY },
  { color: "tertiary", categoryName: ECalendarEventType.HOLIDAY },
  { color: "fourth", categoryName: ECalendarEventType.OTHER },
];

const themeValues = {
  primary: "#facc14",
  secondary: "#5ea5fa",
  tertiary: "#f87171",
  fourth: "#49de80",
};

function CustomCalendar(): ReactElement {
  const queryClient = useQueryClient();
  const calendarRef = useRef<any>(null);
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [calendarMeta, setCalendarMeta] = useState({
    month: moment().format("MMMM"),
    year: moment().format("YYYY"),
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });
  const [dateTitle, setDateTitle] = useState("");
  const [isShowTime, setIsShowTime] = useState(false);
  const [selectedView, setSelectedView] = useState("dayGridMonth");
  const [isShowModalAddEdit, setIsShowModalAddEdit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    id: 0,
    title: "New Event",
    dateTime: [],
    categoryId: 0,
    modalType: ModalEditType.MAKE_EVENT,
  });
  const [categories, setCategories] = useState([]);
  const { data, isLoading, isSuccess } = useQuery<any>(
    [CALENDAR_EVENT, calendarMeta.year, calendarMeta.month],
    () => {
      let q: ListQueryCalendarDTO = {
        startDate: calendarMeta.startDate,
        endDate: calendarMeta.endDate,
      };
      return _findAllCalendarEvent(q);
    }
  );

  async function deleteEvent(id) {
    setIsProcessing(true);
    try {
      await _deleteEvent(id);
      queryClient.invalidateQueries([CALENDAR_EVENT]);
      message.success("DONE");
    } catch (e) {
      console.error(e);
      message.error("Error");
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
      payload.categoryName = formRes?.categoryName;
      payload.hyperlink = formRes?.hyperlink;
      payload.content = formRes?.content || "";
      payload.allDay = !!!isShowTime;
      payload.title = formRes?.title || "";
      payload.start = formRes?.dateTime?.[0] || moment().format();
      payload.end = formRes?.dateTime?.[1] || moment().format();
      res =
        selectedEvent.modalType === ModalEditType.MAKE_EVENT
          ? await _makeNewEvent(payload)
          : await _updateEvent(selectedEvent.id, payload);
      queryClient.invalidateQueries([CALENDAR_EVENT]);
      // queryClient.invalidateQueries(["CALENDAR_LIST", payload.categoryName]);

      message.success("Create Successfully");
    } catch (e) {
      console.error(e);
      message.error("Error");
    }
    setIsProcessing(false);
    setIsShowModalAddEdit(false);
    return res;
  }

  const onPrevButtonClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();

    setCalendarMeta({
      startDate: moment(calendarApi.getDate())
        .startOf("month")
        .format("YYYY-MM-DD"),
      endDate: moment(calendarApi.getDate())
        .endOf("month")
        .format("YYYY-MM-DD"),
      month: moment(calendarApi.getDate()).format("MMMM"),
      year: moment(calendarApi.getDate()).format("YYYY"),
    });
    setDateTitle(calendarApi.view.title);
  };

  const onNextButtonClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();

    setCalendarMeta({
      startDate: moment(calendarApi.getDate())
        .startOf("month")
        .format("YYYY-MM-DD"),
      endDate: moment(calendarApi.getDate())
        .endOf("month")
        .format("YYYY-MM-DD"),
      month: moment(calendarApi.getDate()).format("MMMM"),
      year: moment(calendarApi.getDate()).format("YYYY"),
    });
    setDateTitle(calendarApi.view.title);
  };
  const onNewEventClick = () => {
    try {
      form.resetFields();
      setIsShowModalAddEdit(true);
      setSelectedEvent({
        id: 0,
        title: "New Event",
        dateTime: [],
        categoryId: 0,
        modalType: ModalEditType.MAKE_EVENT,
      });
    } catch (e) {
      console.log("This action could not be completed");
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
    const calendarApi = calendarRef.current.getApi();

    calendarApi.today();

    setCalendarMeta({
      startDate: moment(calendarApi.getDate())
        .startOf("month")
        .format("YYYY-MM-DD"),
      endDate: moment(calendarApi.getDate())
        .endOf("month")
        .format("YYYY-MM-DD"),
      month: moment(calendarApi.getDate()).format("MMMM"),
      year: moment(calendarApi.getDate()).format("YYYY"),
    });
    setDateTitle(calendarApi.view.title);
  };

  // handlers for user actions
  // ------------------------------------------------------------------------------------------
  const handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo.view.calendar;
    setSelectedEvent({
      id: 0,
      title: "",
      dateTime: [moment(selectInfo.startStr), moment(selectInfo.endStr)],
      categoryId: 0,
      modalType: ModalEditType.MAKE_EVENT,
    });
    calendarApi.unselect(); // clear date selection
    try {
      setIsShowModalAddEdit(true);
    } catch (e) {
      console.log("This action could not be completed");
    }
  };

  const handleEventClick = (clickInfo: any) => {
    let targetEvent;
    const { id, url } = clickInfo.event;
    if (id) {
      targetEvent = events.find((_item: any) => _item.id.toString() === id);
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
      console.log("This action could not be completed");
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
      console.log("This action could not be completed");
      changeInfo.revert();
    }
  };

  function setEventState(data) {
    let nextState;
    nextState = displayColoredEvents(data);

    setEvents(nextState);
  }

  function displayColoredEvents(events) {
    if (!Array.isArray(events)) return;
    const coloredEvents = events.map((event: any) => {
      const coloredEvent = { ...event };
      if (event.categoryName) {
        const foundColor = colorsMap.find(
          (x) => (x as any).categoryName === event.categoryName
        );
        if (foundColor) {
          coloredEvent.color = (themeValues as any)[foundColor.color];
        }
      }
      const index = switchCategoryIndex(coloredEvent.categoryName);
      coloredEvent.index = index;
      return coloredEvent;
    });

    return coloredEvents;
  }

  function switchCategoryIndex(_categoryName) {
    switch (_categoryName) {
      case ECalendarEventType.HOLIDAY:
        return "a";

      case ECalendarEventType.EVENT:
        return "b";

      case ECalendarEventType.BIRTHDAY:
        return "c";

      case ECalendarEventType.OTHER:
        return "d";

      default:
        break;
    }
  }

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

  const onSelectYear = (_year) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(
      `${_year}-${moment(calendarApi.getDate()).format("MM")}-01`
    );
    setCalendarMeta({
      startDate: moment(calendarApi.getDate())
        .startOf("month")
        .format("YYYY-MM-DD"),
      endDate: moment(calendarApi.getDate())
        .endOf("month")
        .format("YYYY-MM-DD"),
      month: moment(calendarApi.getDate()).format("MMMM"),
      year: moment(calendarApi.getDate()).format("YYYY"),
    });
    setDateTitle(calendarApi.view.title);
  };

  useEffect(() => {
    if (isSuccess) {
      fetchAllCategories();
      setEventState(data);
    }
    return () => {};
  }, [data, isLoading]);

  return (
    <div className="">
      <Row className="h-40 items-center" justify="start">
        <Col span={6} offset={1}>
          <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
            Calendar
          </div>
        </Col>
      </Row>
      <div className="bg-slate-50 h-full p-4">
        <div className="bg-white p-2 rounded-md -mt-14 shadow-md	">
          <Row justify="end" className="my-10 gap-5 mr-10" align="middle">
            <Col className="flex gap-5">
              <Button
                className="btn-icon btn-icon-start ms-1 w-100 w-md-auto"
                onClick={onPrevButtonClick}
              >
                Prev
              </Button>
              <Button
                className="btn-icon btn-icon-start ms-1 w-100 w-md-auto"
                onClick={onNextButtonClick}
              >
                Next
              </Button>
            </Col>
            <Col className="d-flex align-items-start justify-content-end">
              <Button
                className="btn-icon btn-icon-start ms-1 w-100 w-md-auto"
                onClick={onNewEventClick}
                type="primary"
              >
                Add Event
              </Button>
            </Col>
            <Col>
              <Select
                onChange={(_value) => changeView(_value)}
                value={selectedView}
              >
                <Select.Option key="dayGridMonth" value="dayGridMonth">
                  Month
                </Select.Option>
                <Select.Option key="timeGridWeek" value="timeGridWeek">
                  Week
                </Select.Option>
                <Select.Option key="timeGridDay" value="timeGridDay">
                  Day
                </Select.Option>
              </Select>
            </Col>
            <Col>
              <Select
                onChange={(_value) => onSelectYear(_value)}
                value={calendarMeta.year}
              >
                {createArrayOfYear().map((y) => (
                  <Select.Option key={y} value={y}>
                    {y}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Button
              className="btn-icon btn-icon-start ms-1 w-100 w-md-auto"
              onClick={getToday}
            >
              Today
            </Button>
          </Row>
          <Row justify="center">
            <Col>
              {selectedView === "timeGridDay"
                ? moment(calendarRef.current.getApi().getDate()).format("DD")
                : null}{" "}
              {calendarMeta.month} {calendarMeta.year}
            </Col>
          </Row>
          <div className="container mx-auto px-20 py-10 calendar-container">
            <FullCalendar
              ref={calendarRef}
              schedulerLicenseKey="0261586002-fcs-1640591838"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                bootstrapPlugin,
                resourceTimelinePlugin,
                resourceTimeGridPlugin,
              ]}
              headerToolbar={false}
              initialView="dayGridMonth"
              themeSystem="bootstrap"
              editable
              selectable
              selectMirror
              dayMaxEvents
              weekends
              locale={"th"}
              datesSet={handleDates}
              select={handleDateSelect}
              events={events}
              eventClick={handleEventClick}
              eventChange={handleEventChange} // called for drag-n-drop/resize
              eventOrder={["index"]}
              viewDidMount={viewDidMount}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                meridiem: false,
              }}
            />
          </div>
          <CalendarListFetcher
            setIsShowModalAddEdit={setIsShowModalAddEdit}
            setSelectedEvent={setSelectedEvent}
          />
        </div>
      </div>
      {isShowModalAddEdit && (
        <CalendarEventModal
          handleCloseModal={handleCloseModal}
          selectedEvent={selectedEvent}
          makeNewEvent={makeNewEvent}
          form={form}
          categories={categories}
          isProcessing={isProcessing}
          deleteEvent={deleteEvent}
          isShowTime={isShowTime}
          toggleShowTime={toggleShowTime}
        />
      )}
    </div>
  );
}

export default CustomCalendar;
