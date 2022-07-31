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
  ICreateFormsRequestItem,
  IFormsRequestDetail,
} from "../../services/formsRequest/forms-request.model";
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
    form.resetFields();
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
      destroyOnClose
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
              rules={[({ getFieldValue }) => ({
                validator(_, value) {
                  console.log(value,'value')
                  if (getFieldValue("file")?.fileList?.length > 0 || value?.length > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "กรุณา Upload File หรือ ใส่ Link"
                    )
                  );
                },
              }),]}
              name="downloadLink"
              label="Upload File หรือ ใส่ Link"
            >
              <Input type="text" placeholder="ID พนักงาน" className="" />
            </Form.Item>
            <Form.Item
              dependencies={["downloadLink"]}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("downloadLink").length > 0 || value.fileList.length > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "กรุณา Upload File หรือ ใส่ Link"
                      )
                    );
                  },
                }),
              ]}
              name="file"
            >
              <Upload maxCount={1} multiple={false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Row justify="end" className="mt-6">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
              <Button
                className="ml-2"
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
