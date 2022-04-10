import React from "react";
import {
  CAROUSEL_STATUS,
  ICarousel,
} from "../../services/carousel/carousel.model";
import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import { Button, Col, Image, Popconfirm, Row, Switch, Table } from "antd";
import Link from "next/link";

type Props = {
  carouselData: ICarousel[];
  isLoading: boolean;
  onRemove: (_id: string) => void;
  toggleStatus: (id: string, status: CAROUSEL_STATUS) => Promise<void>;
  isLoadingSwitch: boolean;
  page: number;
  total: number;
  onChangePage: (_page: number) => void;
};

function CarouselList({
  carouselData,
  isLoading,
  onRemove,
  toggleStatus,
  isLoadingSwitch,
  page,
  total,
  onChangePage,
}: Props) {
  const columns = [
    {
      title: "IMAGE",
      dataIndex: "imageUrl",
      className: "normal-col",
      render: (_self, _record) => (
        <Image width={100} height={100} src={_self} alt="image" />
      ),
    },
    {
      title: "TITLE",
      dataIndex: "title",
      className: "normal-col",
      render: (_self, _record) => <p className="text-center">{_self}</p>,
    },
    {
      title: "LINK",
      dataIndex: "linkOut",
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
              checked={_self === CAROUSEL_STATUS.ENABLED}
              onChange={
                _self === CAROUSEL_STATUS.ENABLED
                  ? () => toggleStatus(_record.id, CAROUSEL_STATUS.DISABLED)
                  : () => toggleStatus(_record.id, CAROUSEL_STATUS.ENABLED)
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
            <Link href={`/carousel/edit/${_record?.id}`} passHref>
              <div className="cursor-pointer text-center">
                <FormOutlined />
              </div>
            </Link>
          </Col>
          <Col span={3}>
            <div className="cursor-pointer text-center">
              <Popconfirm
                title="Are you sure to delete this room?"
                onConfirm={() => onRemove(_record?.id)}
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
    <div className="">
      <Table
        dataSource={carouselData}
        loading={isLoading}
        className="w-full"
        scroll={{ x: true }}
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
    </div>
  );
}

export default CarouselList;
