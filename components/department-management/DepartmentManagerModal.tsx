import { Button, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { DepartmentModalType } from "./DepartmentManagementTable";

interface DepartmentManagerModel {
  visible: boolean;
  modalType: DepartmentModalType;
  department?: {
    id: number;
    department: string;
  };
}

type Props = {
  managerModal: DepartmentManagerModel;
  onClose: () => void;
  createDepartment: (department: { department: string }) => Promise<void>;
  updateDepartment: (
    id: number,
    department: { department: string }
  ) => Promise<void>;
};

function DepartmentManagerModal({
  managerModal,
  onClose,
  createDepartment,
  updateDepartment,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (managerModal.department) {
      form.setFieldsValue({
        department: managerModal.department.department,
      });
    } else {
      form.resetFields();
    }
  }, [managerModal.department]);

  const onFinish = async (values: { department: string }) => {
    if (managerModal.modalType === DepartmentModalType.NEW) {
      await createDepartment(values);
    } else if (
      managerModal.modalType === DepartmentModalType.EDIT &&
      managerModal.department
    ) {
      await updateDepartment(managerModal.department.id, values);
    }
  };

  return (
    <Modal
      title={
        managerModal.modalType === DepartmentModalType.NEW
          ? "Create Department"
          : "Edit Department"
      }
      visible={managerModal.visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="department"
          label="Department Name"
          rules={[{ required: true, message: "Please input department name!" }]}
        >
          <Input placeholder="Enter department name" />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {managerModal.modalType === DepartmentModalType.NEW
                ? "Create"
                : "Update"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DepartmentManagerModal;
