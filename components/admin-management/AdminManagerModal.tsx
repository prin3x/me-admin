import { Button, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect } from "react";
import {
  AdminManagerModel,
  AdminModalType,
  CreateAdminDto,
} from "../../services/admin/admin.model";

type Props = {
  managerModal: AdminManagerModel;
  onClose: () => void;
  createAdmin: (createAdmin: CreateAdminDto) => Promise<void>;
  changePassword: (id: number, password: string) => void;
};

function AdminManagerModal({
  managerModal,
  onClose,
  createAdmin,
  changePassword,
}: Props) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: managerModal.username,
      role: managerModal.role || "admin",
    });
  }, []);
  return (
    <Modal visible={true} onCancel={onClose} destroyOnClose footer={false}>
      <h2 className="text-3xl">Admin Manager</h2>
      <div className="max-w-[20rem] d-block mx-auto">
        <Form
          labelCol={{ span: 6 }}
          labelAlign="left"
          form={form}
          onFinish={
            managerModal.modalType === AdminModalType.NEW
              ? (value) => createAdmin(value)
              : (value) => changePassword(managerModal.id, value.password)
          }
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter your username!",
              },
              {
                min: 6,
                message: 'Please enter username at least 6 character'
              }
            ]}
          >
            <Input disabled={managerModal.modalType === AdminModalType.EDIT} />
          </Form.Item>

          {managerModal.modalType === AdminModalType.NEW && (
            <Form.Item
              name="role"
              label="Role"
              initialValue={"admin"}
              rules={[
                {
                  required: true,
                  message: "Please enter your role!",
                },
              ]}
            >
              <Select>
                <Select.Option key="admin" value="admin">
                  Admin
                </Select.Option>
                <Select.Option key="superAdmin" value="superAdmin">
                  SuperAdmin
                </Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="password"
            label={
              managerModal.modalType === AdminModalType.NEW
                ? "Password"
                : "New Password"
            }
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                min: 6,
                message: 'Please enter password at least 6 character'
              }
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Row justify="center" gutter={25}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
              <Button className="ml-5" onClick={onClose}>
                Cancel
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default AdminManagerModal;
