import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { createFloor, getFloors, removeFloor, updateFloor } from "../../services/floor/floor.service";
import { IRoom } from "../../services/meeting-rooms/meeting-room.model";
import ImageUploader from "../utils/ImageUploader";

type Props = {
  onFinish;
  setImage;
  form;
  roomData?: IRoom;
  isEdit?: boolean;
  floor?: any[];
  setFloor?: any;
};

function RoomEditor({
  onFinish,
  setImage,
  form,
  roomData,
  isEdit,
}: Props) {
  const [floors, setFloors] = useState([]);
  const router = useRouter();
  const floorRef = useRef();

  async function fetchAllFloors(): Promise<any> {
    try {
      const floors = await getFloors();
      setFloors(floors);
    } catch (error) {
      message.error(error.message);
    }
  }

  const createNewFloor = async (newFloor) => {
    try {
      await createFloor({floor: newFloor});
      await fetchAllFloors();
    } catch (error) {
      message.error(error);
    }
  }

  const updateExistingFloor =  async (id, updates) => {
    try {
      await updateFloor(id, updates);
      await fetchAllFloors();
    } catch (error) {
      message.error(error);
    }
  }

  const removeExistingFloor = async (floor) => {
    try {
      await removeFloor(floor);
      await fetchAllFloors();
    } catch (error) {
      message.error(error);
    }
  }


  useEffect(() => {
    fetchAllFloors();
  }, []);

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
                    aspect={3 / 2}
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
                  label="Order"
                  name="order"
                >
                  <InputNumber placeholder="order" min={0} />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label="Description"
                  name="description"
                >
                  <Input.TextArea
                    placeholder="description"
                    autoSize={{ minRows: 3 }}
                  />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label="Floor"
                  name="floor"
                  wrapperCol={{ span: 10 }}
                >
                  <Select
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space align="center" style={{ padding: "0 8px 4px" }}>
                          <Input
                            placeholder="Please enter item"
                            ref={floorRef}
                          />
                          <Typography.Link
                            onClick={() =>
                              (floorRef.current as any).state.value
                                ? createNewFloor(
                                    (floorRef.current as any).state.value
                                  )
                                : null
                            }
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <PlusOutlined /> Add item
                          </Typography.Link>
                        </Space>
                      </>
                    )}
                  >
                    {floors.length > 0 &&
                      floors.map((floor) => (
                        <Select.Option key={floor.id} value={floor.floor}>
                          <div className="flex justify-between">
                            <span>{floor.floor}</span>
                            <span className="z-30">
                              <CloseOutlined
                                className="delete--contact-options"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeExistingFloor(floor.id);
                                }}
                              />
                            </span>
                          </div>
                        </Select.Option>
                      ))}
                  </Select>
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
