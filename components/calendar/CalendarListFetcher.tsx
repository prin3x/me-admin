import React, { Dispatch, SetStateAction, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  ECalendarEventType,
  ICalendarEntity,
  ListCalendarDTO,
  ModalEditType,
} from "../../services/calendar/calendar.model";
import { _getCalendarList } from "../../services/calendar/calendar.service";
import CalendarListTable from "./CalendarListTable";
import * as qs from "query-string";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

type Props = {
  setSelectedEvent: Dispatch<SetStateAction<any>>;
  setIsShowModalAddEdit: Dispatch<SetStateAction<boolean>>;
};

const INITIAL_QUERIES: ListCalendarDTO = {
  year: "2022",
  category: ECalendarEventType.EVENT,
  page: 1,
};

function CalendarListFetcher({
  setSelectedEvent,
  setIsShowModalAddEdit,
}: Props) {
  const [query, setQuery] = useState<ListCalendarDTO>(INITIAL_QUERIES);
  const calendarListData = useQuery(["CALENDAR_LIST", query.category, query], () =>
    getCalendarList(query)
  );

  async function getCalendarList(q: ListCalendarDTO) {
    const queryString = qs.stringify(q);
    let rtn: any;
    try {
      rtn = await _getCalendarList(queryString);
    } catch (error) {
      message.error("Unable to load list of event");
    }

    return rtn;
  }

  const onEdit = (targetEvent: ICalendarEntity) => {
    setSelectedEvent({
      ...targetEvent,
      dateTime: [moment(targetEvent.start), moment(targetEvent.end)],
      modalType: ModalEditType.EDIT_EVENT,
    });
    setIsShowModalAddEdit(true);
  };

  const props = {
    calendarListData: calendarListData.data,
    isLoading: calendarListData.isLoading,
    setQuery,
    onEdit,
  };

  if (calendarListData.isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
      </div>
    );
  }

  if (calendarListData.isError) {
    return null;
  }

  return <CalendarListTable {...props} />;
}

export default CalendarListFetcher;
