import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Upload,
} from "antd";
import React, { ReactElement } from "react";
import { useEffect } from "react";
import {
  ICreateServiceContactItem,
  IServiceContactDetail,
} from "../../services/serviceContact/service-contact.model";

type Props = {
  editListItemData: any;
  onClose: (item?: IServiceContactDetail) => void;
  onUpdate: (item: ICreateServiceContactItem) => void;
  onRemove: (id: string) => void;
};

function ServiceContactListItemDrawer({
  editListItemData,
  onClose,
  onUpdate,
  onRemove,
}: Props): ReactElement {
  const [form] = Form.useForm();
  useEffect(() => {
    if (editListItemData.id) {
      form.setFieldsValue({ ...editListItemData });
    }
  }, [editListItemData]);

  return (
    <Drawer
      title="Edit Objective"
      placement={"right"}
      width={300}
      onClose={() => onClose()}
      visible={editListItemData.isEditing}
    >
      <Row justify="start">
        <Col className="mx-auto">
          <Form
            form={form}
            layout="vertical"
            onFinish={(formVal) => onUpdate(formVal)}
          >
            <Form.Item
              rules={[{ required: true, message: "Please enter title" }]}
              name="objective"
              className="m-0"
            >
              <Input type="text" placeholder="ชื่อรายการ" className="w-full" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name="contactID"
              label="1st Contact"
            >
              <Input type="text" placeholder="เบอร์ติดต่อหลัก" className="" />
            </Form.Item>
            <Form.Item name="contactPhoneNumber" label="2nd Contact">
              <Input type="text" placeholder="เบอร์ติดต่อรอง" className="" />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name="name">
              <Input type="text" placeholder="ชื่อ Contact" className="" />
            </Form.Item>
            <Row justify="end">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
              <Button
                danger
                onClick={() => onRemove(editListItemData.id)}
              >
                Remove
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
}

export default ServiceContactListItemDrawer;
