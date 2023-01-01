import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import { Col, Form, message, Popconfirm, Row, Select, Table } from "antd";
import moment from "moment";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useQueryClient } from "react-query";
import {
  ECalendarEventType,
  ICalendarEntity,
  ICalendarPagination,
  ListCalendarDTO,
} from "../../services/calendar/calendar.model";
import { _deleteEvent } from "../../services/calendar/calendar.service";

type Props = {
  calendarListData: ICalendarPagination;
  isLoading: boolean;
  setQuery: Dispatch<SetStateAction<ListCalendarDTO>>;
  onEdit(argetEvent: ICalendarEntity): void;
  query: ListCalendarDTO;
};

function CalendarListTable({
  calendarListData,
  isLoading,
  setQuery,
  query,
  onEdit,
}: Props) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const onFormChange = (formValues) => {
    setQuery((prev) => {
      return { ...prev, ...formValues, page: 1 };
    });
  };

  const onChangePage = (page: number, pageSize: number) => {
    setQuery((prev) => {
      return { ...prev, page, limit: pageSize };
    });
  };

  async function deleteEvent(id) {
    try {
      await _deleteEvent(id);
      queryClient.invalidateQueries(["CALENDAR_LIST"]);
      message.success("DONE");
    } catch (e) {
      console.error(e);
      message.error("Error Please Try Again");
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      category: query.category
    })
  },[query])

  const columns = [
    {
      title: "Date",
      dataIndex: "start",
      className: "normal-col",
      width: 150,
      render: (_self, _record) => (
        <p className="text-center">{moment(_self).format("DD MMMM YYYY")}</p>
      ),
    },
    {
      title: "Calendar Info",
      dataIndex: "title",
      className: "normal-col",
      width: 150,
      render: (_self, _record) => <p className="text-center">{_self}</p>,
    },
    {
      title: "EDIT",
      dataIndex: "edit",
      className: "normal-col",
      width: 100,
      render: (_self, _record) => (
        <Row justify="center" gutter={40}>
          <Col span={3}>
            <div className="cursor-pointer text-center">
              <FormOutlined onClick={() => onEdit(_record)} />
            </div>
          </Col>
          <Col span={3}>
            <div className="cursor-pointer text-center">
              <Popconfirm
                title="Are you sure to delete this event?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteEvent(_record.id)}
              >
                <DeleteFilled />
              </Popconfirm>
            </div>
          </Col>
        </Row>
      ),
    },
  ];
  return (
    <div>
      <div className="font-bold text-3xl text-center">Calendar List</div>
      <Row className="my-5" justify="center">
        <Form form={form} onValuesChange={(_, all) => onFormChange(all)} layout="inline">
          <Form.Item
            name="category"
            label="Calendar Type"
            initialValue={ECalendarEventType.EVENT}
          >
            <Select className="w-full" style={{ width: 200 }}>
              <Select.Option value={ECalendarEventType.HOLIDAY} key={ECalendarEventType.HOLIDAY} >
                {ECalendarEventType.HOLIDAY.toUpperCase()}
              </Select.Option>
              <Select.Option value={ECalendarEventType.EVENT} key={ECalendarEventType.EVENT} >
                {ECalendarEventType.EVENT.toUpperCase()}
              </Select.Option>
              <Select.Option value={ECalendarEventType.BIRTHDAY} key={ECalendarEventType.BIRTHDAY} >
                {ECalendarEventType.BIRTHDAY.toUpperCase()}
              </Select.Option>
              <Select.Option value={ECalendarEventType.OTHER} key={ECalendarEventType.OTHER} >
                {ECalendarEventType.OTHER.toUpperCase()}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="year" label="Year" initialValue={2023}>
            <Select
              placeholder="2023"
              className="w-full"
              style={{ width: 200 }}
            >
              <Select.Option value="2023">2023</Select.Option>
              <Select.Option value="2022">2022</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Row>

      <Table
        onChange={(page, _, sort) => console.log(page, sort)}
        dataSource={calendarListData?.items || []}
        loading={isLoading}
        // scroll={{ x: true }}
        bordered
        rowKey={(_row) => _row.id}
        tableLayout="fixed"
        pagination={{
          current: calendarListData?.page || 1,
          pageSize: query.limit,
          total: calendarListData?.total,
          onChange: onChangePage,
          showSizeChanger: true,
        }}
        columns={columns}
      />
    </div>
  );
}

export default CalendarListTable;
