import { Button, Col, message, Popconfirm, Row, Table } from "antd";
import React, { useState } from "react";
import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import DepartmentManagerModal from "./DepartmentManagerModal";
import { useQueryClient } from "react-query";
import {
  createDepartments,
  removeDepartments,
  updateDepartments,
} from "../../services/department/department.service";

type Props = {
  departments: any[];
  onChangePage: (page: number) => void;
};

export enum DepartmentModalType {
  NEW = "NEW",
  EDIT = "EDIT",
}

export interface DepartmentManagerModel {
  visible: boolean;
  modalType: DepartmentModalType;
  department?: {
    id: number;
    department: string;
  };
}

function DepartmentManagementTable({ departments, onChangePage }: Props) {
  const queryClient = useQueryClient();
  const [managerModal, setManagerModal] = useState<DepartmentManagerModel>({
    visible: false,
    modalType: DepartmentModalType.NEW,
  });

  const toggleManagerModal = (type: DepartmentModalType, department?: any) => {
    setManagerModal({
      visible: true,
      modalType: type,
      department,
    });
  };

  const onCloseManagerModal = () => {
    setManagerModal({
      visible: false,
      modalType: DepartmentModalType.NEW,
    });
  };

  const createDepartment = async (department: { department: string }) => {
    try {
      await createDepartments(department);
      message.success("Department created successfully");
      queryClient.invalidateQueries("departments");
      onCloseManagerModal();
    } catch (error) {
      message.error("Failed to create department");
    }
  };

  const updateDepartment = async (
    id: number,
    department: { department: string }
  ) => {
    try {
      await updateDepartments(id, department);
      message.success("Department updated successfully");
      queryClient.invalidateQueries("departments");
      onCloseManagerModal();
    } catch (error) {
      message.error("Failed to update department");
    }
  };

  const removeDepartment = async (id: number) => {
    try {
      await removeDepartments(id);
      message.success("Department removed successfully");
      queryClient.invalidateQueries("departments");
    } catch (error) {
      message.error("Failed to remove department");
    }
  };

  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<FormOutlined />}
            onClick={() => toggleManagerModal(DepartmentModalType.EDIT, record)}
          />
          <Popconfirm
            title="Are you sure to delete this department?"
            onConfirm={() => removeDepartment(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteFilled />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="px-10 pb-20">
      <Row className="h-40 items-center" justify="start">
        <Col span={24} offset={1}>
          <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
            Department Management
          </div>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="primary"
          onClick={() => toggleManagerModal(DepartmentModalType.NEW)}
        >
          CREATE
        </Button>
      </Row>
      <div className="bg-slate-50 h-full p-4 mt-14">
        <div className="bg-white p-2 rounded-md -mt-14 shadow-md">
          <Table
            dataSource={departments}
            columns={columns}
            rowKey="id"
            pagination={{
              current: 1,
              pageSize: 10,
              total: departments.length,
              onChange: (page) => onChangePage(page),
            }}
          />
        </div>
      </div>

      {managerModal.visible && (
        <DepartmentManagerModal
          managerModal={managerModal}
          onClose={onCloseManagerModal}
          createDepartment={createDepartment}
          updateDepartment={updateDepartment}
        />
      )}
    </div>
  );
}

export default DepartmentManagementTable;
