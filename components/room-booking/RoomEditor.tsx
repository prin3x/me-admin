import { Button, Col, Form, Input, InputNumber, message, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IRoom } from "../../services/meeting-rooms/meeting-room.model";
import ImageUploader from "../utils/ImageUploader";

type Props = {
  onFinish;
  setImage;
  form;
  roomData?: IRoom;
  isEdit?: boolean;
};

function RoomEditor({ onFinish, setImage, form, roomData, isEdit }: Props) {
  const router = useRouter();
  return (
    <div className="mt-10">
      <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl ml-10">
        Meeting Room
      </div>
      <div className="bg-white p-5">
        <Row className="mt-10 w-full">
          <Form
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            className="w-full"
            labelCol={{ span: 5 }}
            labelAlign="left"
          >
            <Row className="w-full" justify="center">
              <Col span={10} offset={1}>
                <Form.Item rules={[{ required: true }]} name="image">
                  <ImageUploader
                    height={272}
                    width={408}
                    setImage={setImage}
                    currentImageUrl={roomData?.imageUrl || undefined}
                  />
                  <div className="lead text-lg text-center">
                    Size (W x H) 408 x 272 px
                    <br />3 : 2
                  </div>
                </Form.Item>
              </Col>
              <Col span={10} offset={1}>
                <Form.Item
                  rules={[{ required: true }]}
                  label="Room Name"
                  name="name"
                >
                  <Input placeholder="name" />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label="Capacity"
                  name="capacity"
                >
                  <InputNumber placeholder="capacity" />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label="Description"
                  name="description"
                >
                  <Input placeholder="description" />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label="Floor"
                  name="floor"
                >
                  <InputNumber placeholder="floor" min={1} defaultValue={1} />
                </Form.Item>
                <Row justify="end" align="bottom" className="h-52">
                  <Form.Item>
                    <Button
                      type="ghost"
                      onClick={() => router.push("/meeting-rooms")}
                      className="mr-5"
                    >
                      Back
                    </Button>
                    <Button type="primary" htmlType="submit">
                      {isEdit ? "Confirm" : "Create"}
                    </Button>
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </div>
  );
}

export default RoomEditor;
