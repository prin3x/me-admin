import {
  DeleteFilled,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Popconfirm,
  Row,
} from "antd";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ContactStatus, IContact } from "../../services/contact/contact.model";
import { ALL_CONTACT } from "../../services/contact/contact.queryKey";
import {
  _createNewStaffContact,
  _getAllStaffContacts,
  _patchStaffContact,
  _removeStaffContact,
} from "../../services/contact/contact.service";
import DrawerEditor from "./DrawerEditor";
import * as queryString from "query-string";

export enum DrawerType {
  EDIT = "EDIT",
  NEW = "NEW",
}

export interface IBasicQuery {
  limit?: number;
  page?: number;
}

const INITIAL_STATE = {
  visible: false,
  id: 0,
  profilePicUrl: "https://ui-avatars.com/api/?rounded=true",
  name: "",
  nickname: "",
  company: "",
  department: "",
  division: "",
  ipPhone: "",
  email: "",
  status: ContactStatus.ENABLED,
  type: DrawerType.NEW,
};

import { Table } from "antd";
import React from "react";
import { useRouter } from "next/router";

type Props = {};

function ContactTable({}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const [queryStr, setQueryStr] = useState<IBasicQuery>({ page: 1 });

  const parseQuery = () => queryString.stringify(queryStr);

  const { data, isLoading, isSuccess } = useQuery([ALL_CONTACT, queryStr], () =>
    _getAllStaffContacts(parseQuery())
  );

  const [drawerMeta, setDrawerMeta] = useState(INITIAL_STATE);

  function toggleDrawer(_state = INITIAL_STATE) {
    setDrawerMeta({
      ..._state,
      visible: drawerMeta.visible ? false : true,
    });
  }

  function handleCreateNewContact() {
    setDrawerMeta(INITIAL_STATE);
    toggleDrawer(INITIAL_STATE);
  }

  function openDrawerByContact(_contact) {
    if (!_contact) return;

    let targetContact;

    targetContact = data?.items?.find((_person) => _person.id === _contact.id);

    if (!targetContact) return;

    setDrawerMeta({
      ...targetContact,
      type: DrawerType.EDIT,
      visible: true,
    });
  }

  async function removeContactById(_id: string) {
    try {
      await _removeStaffContact(_id);
      await queryClient.invalidateQueries([ALL_CONTACT]);
    } catch (e) {
      message.error(e.response.message);
    }
  }

  function onChangePage(_page, _pageSize) {
    const querySet = {
      ...queryStr,
      page: _page,
      limit: _pageSize,
    };

    setQueryStr(querySet);
  }

  function onChangeSearch(e) {
    e.preventDefault();
    const querySet = {
      ...queryStr,
      search: e.target.value,
      page: 1,
    };

    setQueryStr(querySet);
  }

  async function createOrUpdateContact() {
    let res;
    form.validateFields().then(async (_result) => {
      const staffContactInstance = {} as IContact;
      staffContactInstance.name = _result.name;
      staffContactInstance.company = _result.company;
      staffContactInstance.nickname = _result.nickname;
      staffContactInstance.department = _result.department;
      staffContactInstance.division = _result.division;
      staffContactInstance.email = _result.email;
      staffContactInstance.ipPhone = _result.ipPhone;
      staffContactInstance.profilePicUrl = image;
      staffContactInstance.birthDate = _result.birthDate;

      try {
        if (drawerMeta.type === DrawerType.NEW) {
          res = await _createNewStaffContact(staffContactInstance);
        } else {
          res = await _patchStaffContact(drawerMeta.id, staffContactInstance);
        }
        queryClient.invalidateQueries([ALL_CONTACT]);
        toggleDrawer();
      } catch (e) {
        console.error(e);
      }
    });

    return res;
  }

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      render: (_self: string, _record: any) => (
        <div className="flex items-center gap-2">
          <div className="">
            <Image
              width={50}
              height={50}
              alt=""
              src={_record.profilePicUrl}
              className="staff-image"
              preview={false}
            />
          </div>
          <div className="flex flex-col items-start ">
            <p
              className="text-left cursor-pointer text-primary-color mb-0 font-semibold	leading-4	"
            >
              {_self}
            </p>
            <p className="text-left cursor-pointer mb-0">{_record.nameTH}</p>
          </div>
        </div>
      ),
    },
    {
      title: "NICKNAME",
      dataIndex: "nickname",
      render: (_self) => <p className="text-center">{_self}</p>,
    },
    {
      title: "COMPANY",
      dataIndex: "company",
      render: (_self) => <p className="text-center">{_self}</p>,
    },
    {
      title: "DEPARTMENT",
      dataIndex: "department",
      render: (_self) => <p className="text-center">{_self}</p>,
    },
    {
      title: "IP-PHONE",
      dataIndex: "ipPhone",
      render: (_self) => <p className="text-center">{_self}</p>,
    },
    {
      title: "E-MAIL",
      dataIndex: "email",
      render: (_self) => <p className="text-center">{_self}</p>,
    },
    {
      title: "EDIT",
      dataIndex: "edit",
      className: "normal-col",
      render: (_self, _record) => (
        <Row justify="center" gutter={40}>
          <Col span={3}>
            <div className="cursor-pointer text-center">
              <FormOutlined onClick={() => openDrawerByContact(_record)} />
            </div>
          </Col>
          <Col span={3}>
            <div className="cursor-pointer text-center">
              <Popconfirm
                title="Are you sure to delete this contact?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => removeContactById(_record.id)}
              >
                <DeleteFilled />
              </Popconfirm>
            </div>
          </Col>
        </Row>
      ),
    },
  ];
  return (
    <div className="">
      <Row className="h-40 items-center" justify="start">
        <Col span={6} offset={1}>
          <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
            Contacts
          </div>
        </Col>
        <Col span={12}>
          <Input
            onChange={onChangeSearch}
            placeholder="SEARCH"
            className="ml-auto text-right search-text-right"
            prefix={
              <SearchOutlined
                style={{
                  color: "#D8D8D8",
                }}
              />
            }
          />
        </Col>
        <Col span={2} offset={1}>
          <Button onClick={handleCreateNewContact} type="primary">
            CREATE
          </Button>
        </Col>
      </Row>
      <div className="bg-slate-50 h-full p-4">
        <div className="bg-white p-2 rounded-md -mt-14 shadow-md	">
          <Table
            dataSource={data?.items || []}
            loading={isLoading}
            // scroll={{ x: true }}
            bordered
            rowKey={(_row) => _row.id}
            tableLayout="fixed"
            pagination={{
              current: queryStr.page,
              pageSize: queryStr.limit || 10,
              total: data?.total,
              onChange: onChangePage,
            }}
            columns={columns}
          />

          {drawerMeta.visible && (
            <DrawerEditor
              isShowDrawerEditor={drawerMeta.visible}
              toggleDrawer={toggleDrawer}
              drawerMeta={drawerMeta}
              form={form}
              createOrUpdateContact={createOrUpdateContact}
              setImage={setImage}
              image={image}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactTable;
