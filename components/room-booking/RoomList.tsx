import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import { Button, Col, Image, Popconfirm, Row, Switch, Table } from "antd";
import moment from "moment-timezone";
import Link from "next/link";
import React from "react";
import {
  IRoom,
  ROOM_STATUS,
} from "../../services/meeting-rooms/meeting-room.model";

type Props = {
  roomData: IRoom[];
  isLoading: boolean;
  removeThisRoom: (_id: string) => void;
  toggleStatus: (id: string, status: ROOM_STATUS) => Promise<void>;
  isLoadingSwitch: boolean;
  page: number;
  total: number;
  onChangePage: (_page: number) => void;
};

function RoomList({
  roomData,
  isLoading,
  removeThisRoom,
  toggleStatus,
  isLoadingSwitch,
  page,
  total,
  onChangePage,
}: Props) {
  const columns = [
    {
      title: "Created Date",
      dataIndex: "createdDate",
      className: "normal-col",
      render: (_self, _record) => <p className="text-center">{moment(_self).tz('Asia/Bangkok').format('DD MM YYYY HH:mm')}</p>,
    },
    {
      title: "ROOM",
      dataIndex: "imageUrl",
      className: "normal-col",
      render: (_self, _record) => (
        <Image width={100} height={100} src={_self} alt="image" />
      ),
    },
    {
      title: "NAME",
      dataIndex: "name",
      className: "normal-col",
      render: (_self, _record) => <p className="text-center">{_self}</p>,
    },
    {
      title: "FLOOR",
      dataIndex: "floor",
      className: "normal-col",
      render: (_self, _record) => <p className="text-center">{_self}</p>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      className: "normal-col",
      render: (_self, _record) => (
        <p className="text-center">
          {
            <Switch
              loading={isLoadingSwitch}
              checked={_self === ROOM_STATUS.ENABLED}
              onChange={
                _self === ROOM_STATUS.ENABLED
                  ? () => toggleStatus(_record.id, ROOM_STATUS.DISABLED)
                  : () => toggleStatus(_record.id, ROOM_STATUS.ENABLED)
              }
            />
          }
        </p>
      ),
    },
    {
      title: "EDIT",
      dataIndex: "edit",
      className: "normal-col",
      render: (_self, _record) => (
        <Row justify="center" gutter={40}>
          <Col span={3}>
            <Link href={`/meeting-rooms/edit/${_record?.id}`} passHref>
              <div className="cursor-pointer text-center">
                <FormOutlined />
              </div>
            </Link>
          </Col>
          <Col span={3}>
            <div className="cursor-pointer text-center">
              <Popconfirm
                title="Are you sure to delete this room?"
                onConfirm={() => removeThisRoom(_record?.id)}
                okText="Yes"
                cancelText="No"
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
    <Table
      dataSource={roomData}
      loading={isLoading}
      className="w-full"
      // scroll={{ x: true }}
      bordered
      rowKey={(_row) => _row?.id}
      tableLayout="fixed"
      columns={columns}
      pagination={{
        current: page,
        pageSize: 10,
        total,
        onChange: onChangePage,
      }}
    />
  );
}

export default RoomList;
