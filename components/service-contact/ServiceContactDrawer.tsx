import { Button, Col, Drawer, Form, Input, Row } from "antd";
import React, { ReactElement } from "react";
import { useEffect } from "react";
import {
  ETypeOfEditing,
  ICreateServiceContactCategory,
  ICreateServiceContactItem,
  IUpdateServiceContactCategory,
} from "../../services/serviceContact/service-contact.model";

type Props = {
  editObjectiveData: any;
  onClose: () => void;
  onCreateNewObjectiveCategory: (title: string) => void;
  onUpdate: (item: ICreateServiceContactCategory) => void;
  onRemove: (id: string) => void;
};

function ServiceContactDrawer({
  editObjectiveData,
  onClose,
  onCreateNewObjectiveCategory,
  onUpdate,
  onRemove,
}: Props): ReactElement {
  const [form] = Form.useForm();
  useEffect(() => {
    if (editObjectiveData.title) {
      form.setFieldsValue({
        title: editObjectiveData.title,
      });
    }
  }, [editObjectiveData]);

  return (
    <Drawer
      title="Add Objective"
      placement={"right"}
      width={300}
      onClose={onClose}
      visible={editObjectiveData.isEditing}
    >
      <Row justify="start">
        <Col className="mx-auto">
          <Form
            form={form}
            layout="vertical"
            onFinish={(formVal) =>
              editObjectiveData.type === ETypeOfEditing.CREATE
                ? onCreateNewObjectiveCategory(formVal.title)
                : onUpdate(formVal)
            }
          >
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
            <Row justify="end">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editObjectiveData.type === ETypeOfEditing.CREATE
                    ? "Confirm"
                    : "Update"}
                </Button>
              </Form.Item>
              {editObjectiveData.type === ETypeOfEditing.UPDATED && (
                <Button onClick={() => onRemove(editObjectiveData.categoryId)} danger>
                  Remove
                </Button>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
}

export default ServiceContactDrawer;
