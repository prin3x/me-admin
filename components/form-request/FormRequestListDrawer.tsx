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
import { ICreateFormsRequestItem, IFormsRequestDetail } from "../../services/formsRequest/forms-request.model";
import { IFormRequestEditState } from "./FormRequestTableList";

type Props = {
  editListItemData: IFormRequestEditState;
  onClose: (item?: IFormsRequestDetail) => void;
  onUpdate: (item: ICreateFormsRequestItem) => void;
  onRemove: (id: string) => void;
};

function FormRequestListDrawer({
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
              name="content"
              className="m-0"
            >
              <Input type="text" placeholder="ชื่อรายการ" className="w-full" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name="downloadLink"
              label="Contact ID"
            >
              <Input type="text" placeholder="ID พนักงาน" className="" />
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

export default FormRequestListDrawer;
