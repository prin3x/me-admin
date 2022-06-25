import React from "react";
import { ICarousel } from "../../services/carousel/carousel.model";
import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import { Button, Col, Image, Popconfirm, Row, Switch, Table } from "antd";
import Link from "next/link";
import {
  IPostItem,
  IPostStruct,
  POST_STATUS,
} from "../../services/post/post.model";

type Props = {
  postData: IPostItem[];
  isLoading: boolean;
  onRemove: (_id: string) => void;
  toggleStatus: (id: string, status: POST_STATUS) => Promise<void>;
  isLoadingSwitch: boolean;
  page: number;
  total: number;
  onChangePage: (_page: number) => void;
};

function PostTable({
  postData,
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
      title: "CONTENT",
      dataIndex: "content",
      className: "normal-col",
      render: (_self, _record) => (
        <p className="text-center">
          {_self.length > 20 ? _self.slice(0, 20) + "..." : _self}
        </p>
      ),
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
              checked={_self === POST_STATUS.ENABLED}
              onChange={
                _self === POST_STATUS.ENABLED
                  ? () => toggleStatus(_record.id, POST_STATUS.DISABLED)
                  : () => toggleStatus(_record.id, POST_STATUS.ENABLED)
              }
            />
          }
        </p>
      ),
    },
    {
      title: "UPDATED",
      dataIndex: "updatedDate",
      className: "normal-col",
      render: (_self, _record) => <p className="text-center">{_self}</p>,
    },
    {
      title: "EDIT",
      dataIndex: "edit",
      className: "normal-col",
      render: (_self, _record) => (
        <Row justify="center" gutter={40}>
          <Col span={3}>
            <Link href={`/news-editor/edit/${_record?.slug}`} passHref>
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
        dataSource={postData}
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
    </div>
  );
}

export default PostTable;
