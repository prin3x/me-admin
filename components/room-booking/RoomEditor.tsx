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
  return (
    <div className="mt-10">
      <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl ml-10">
        New Room
      </div>
      <div className="bg-white p-5">
        <Row className="mt-10 w-full">
          <Form
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            className="w-full"
            labelCol={{ span: 5 }}
          >
            <Row className="w-full" justify="center">
              <Col span={10} offset={1}>
                <Form.Item rules={[{ required: true }]} name="image">
                  <ImageUploader
                    setImage={setImage}
                    currentImageUrl={roomData?.imageUrl || ""}
                  />
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
                  rules={[{ required: false }]}
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
                  <InputNumber placeholder="floor" />
                </Form.Item>
                <Row justify="end" align="bottom" className="h-52">
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      {isEdit ? "Confirm Edit " : "Create"}
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
