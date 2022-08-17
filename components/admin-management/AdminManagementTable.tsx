import {
  Button,
  Col,
  message,
  Popconfirm,
  Row,
  Select,
  Switch,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  AdminManagerModel,
  AdminModalType,
  ADMIN_ROLES,
  ADMIN_STATUS,
  CreateAdminDto,
  IAdminData,
  IAdminJWT,
  IAdminModel,
} from "../../services/admin/admin.model";
import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import AdminManagerModal from "./AdminManagerModal";
import {
  validateAdminRole,
  _changeAdminNewPassword,
  _changeAdminRole,
  _changeAdminStatus,
  _createAdmin,
  _removeAdmin,
} from "../../services/admin/admin.service";
import { useQueryClient } from "react-query";
import { ADMIN_QUERY } from "../../services/admin/admin.queryKey";
import moment from "moment-timezone";
import Image from "next/image";

type Props = {
  adminRawData: IAdminData;
  onChangePage: (page: number) => void;
};

function AdminManagementTable({ adminRawData, onChangePage }: Props) {
  const queryClient = useQueryClient();
  const [selfDetail, setSelfDetail] = useState<IAdminJWT>({} as IAdminJWT);
  const [managerModal, setManagerModal] = useState<AdminManagerModel>(
    {} as AdminManagerModel
  );
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleManagerModal = (
    type: AdminModalType,
    item?: AdminManagerModel
  ) => {
    let modalType = type;
    const newState = { ...item, modalType };
    setManagerModal(newState);
  };

  const onCloseManagerModal = () => {
    setManagerModal({} as AdminManagerModel);
  };

  const toggleStatus = async (_record: IAdminModel) => {
    setIsLoadingStatus(true);
    try {
      await _changeAdminStatus(
        _record.id,
        _record.status === ADMIN_STATUS.ENABLED
          ? ADMIN_STATUS.DISABLED
          : ADMIN_STATUS.ENABLED
      );
      queryClient.invalidateQueries([ADMIN_QUERY]);
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const createAdmin = async (createAdmin: CreateAdminDto) => {
    setIsLoading(true);
    try {
      await _createAdmin(createAdmin);
      setManagerModal({} as AdminManagerModel);
      queryClient.invalidateQueries([ADMIN_QUERY]);
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdminRole = async (
    adminRecord: IAdminModel,
    role: ADMIN_ROLES
  ) => {
    if (role === adminRecord.role) return;
    try {
      setIsLoading(true);
      await _changeAdminRole(adminRecord.id, role);
      setManagerModal({} as AdminManagerModel);
      queryClient.invalidateQueries([ADMIN_QUERY]);
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (id: number, password: string) => {
    try {
      setIsLoading(true);
      await _changeAdminNewPassword(id, password);
      setManagerModal({} as AdminManagerModel);
      queryClient.invalidateQueries([ADMIN_QUERY]);
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAdmin = async (id) => {
    setIsLoading(true);
    try {
      await _removeAdmin(id);
      setManagerModal({} as AdminManagerModel);
      queryClient.invalidateQueries([ADMIN_QUERY]);
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Created Date",
      dataIndex: "createdDate",
      className: "normal-col",
      render: (_self, _record) => <p className="text-center">{moment(_self).tz("Asia/Bangkok").format("DD MM YYYY HH:mm")}</p>,
    },
    {
      title: "Username",
      dataIndex: "username",
      className: "normal-col",
      render: (_self, _record) => <p className="text-center">{_self}</p>,
    },
    {
      title: "ROLE",
      dataIndex: "role",
      className: "normal-col",
      render: (_self, _record) => (
        <Select
          value={_self}
          disabled={selfDetail.id && _record.id === selfDetail?.id}
          onChange={(value) => updateAdminRole(_record, value)}
        >
          <Select.Option key="admin" value="admin">
            Admin
          </Select.Option>
          <Select.Option key="superAdmin" value="superAdmin">
            SuperAdmin
          </Select.Option>
        </Select>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      className: "normal-col",
      render: (_self, _record) => (
        <p className="text-center">
          {
            <Switch
              disabled={selfDetail.id && _record.id === selfDetail?.id}
              loading={isLoadingStatus}
              checked={_self === ADMIN_STATUS.ENABLED}
              onClick={() => toggleStatus(_record)}
            />
          }
        </p>
      ),
    },
    {
      title: "EDIT",
      dataIndex: "edit",
      className: "normal-col",
      render: (_self, _record) => (
        <Row justify="center" gutter={40}>
          <Col span={3}>
            <div className="cursor-pointer text-center">
              <FormOutlined
                onClick={() => toggleManagerModal(AdminModalType.EDIT, _record)}
              />
            </div>
          </Col>
          <Col span={3}>
            <div className="cursor-pointer text-center">
              <Popconfirm
                title="Are you sure to delete this account?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteAdmin(_record.id)}
              >
                <DeleteFilled />
              </Popconfirm>
            </div>
          </Col>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    const adminDetial: IAdminJWT = validateAdminRole();
    setSelfDetail(adminDetial);
  }, []);

  return (
    <div className="px-10 pb-20">
      <Row className="h-40 items-center" justify="start">
        <Col span={24} offset={1}>
          <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
            Admin Management
          </div>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="primary"
          onClick={() => toggleManagerModal(AdminModalType.NEW)}
        >
          CREATE
        </Button>
      </Row>
      <div className="bg-slate-50 h-full p-4 mt-14">
        <div className="bg-white p-2 rounded-md -mt-14 shadow-md">
          <Table
            dataSource={adminRawData.items}
            loading={isLoading}
            className="w-full mt-5"
            // scroll={{ x: true }}
            bordered
            rowKey={(_row) => _row?.id}
            tableLayout="fixed"
            columns={columns}
            pagination={{
              current: 1,
              pageSize: 10,
              total: adminRawData.total,
              onChange: (page) => onChangePage(page),
            }}
          />
        </div>
      </div>

      {(managerModal.modalType === AdminModalType.NEW ||
        managerModal.modalType === AdminModalType.EDIT) && (
        <AdminManagerModal
          managerModal={managerModal}
          onClose={onCloseManagerModal}
          createAdmin={createAdmin}
          changePassword={changePassword}
        />
      )}
      <img src='/admin-mgt.jpeg'  alt='admin-management'/>
    </div>
  );
}

export default AdminManagementTable;
