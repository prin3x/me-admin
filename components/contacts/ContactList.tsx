import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, List, Row } from "antd";
import moment from "moment";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery, useQueryClient } from "react-query";
import { ASSET_URL } from "../../config";
import { ContactStatus, IContact } from "../../services/contact/contact.model";
import { ALL_CONTACT } from "../../services/contact/contact.queryKey";
import {
  _createNewStaffContact,
  _getAllStaffContacts,
  _patchStaffContact,
} from "../../services/contact/contact.service";
import DrawerEditor from "./DrawerEditor";
import * as queryString from "query-string";

export enum DrawerType {
  EDIT = "EDIT",
  NEW = "NEW",
}

export interface IBasicQuery {
  limit: number;
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

function ContactList() {
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const [queryStr, setQueryStr] = useState<IBasicQuery>({ limit: 10 });

  const parseQuery = () => queryString.stringify(queryStr);

  const { data, isLoading, isSuccess } = useQuery([ALL_CONTACT, queryStr], () =>
    _getAllStaffContacts(parseQuery())
  );

  const [hasMore, setHasMore] = useState(true);

  const [drawerMeta, setDrawerMeta] = useState(INITIAL_STATE);

  function getMoreContacts() {
    const curLim = queryStr.limit;
    const nextLim = curLim + 10;

    setQueryStr({ limit: nextLim });

    if (!data) return;
    if (nextLim > data?.total) {
      setHasMore(false);
    }
  }

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

  return (
    <div className="container mx-auto">
      <Row className="h-40 items-center" justify="start">
        <Col span={6} offset={1}>
          <div className="lg:text-5xl font-bold text-white md:text-4xl xs:text-xl">
            Staff Contact
          </div>
        </Col>
        <Col span={12}>
          <Input
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
          <Button type="primary" onClick={handleCreateNewContact}>Add New</Button>
        </Col>
      </Row>
      <div className="bg-slate-50 h-full p-4">
        <div className="bg-white p-2 rounded-md -mt-14 shadow-md	">
          <InfiniteScroll
            dataLength={isSuccess ? data.items.length : 0}
            next={getMoreContacts}
            hasMore={hasMore}
            loader={
              <div className="w-screen h-screen flex flex-col justify-center items-center">
                <LoadingOutlined style={{ fontSize: 48, color: "#000" }} spin />
              </div>
            }
          >
            <List
              dataSource={isSuccess ? data.items : []}
              loading={isLoading}
              renderItem={(_contact: IContact) => (
                <List.Item key={_contact.id}>
                  <Row
                    onClick={() => openDrawerByContact(_contact)}
                    gutter={[32, 0]}
                    className="w-full"
                  >
                    <Col md={6}>
                      <List.Item.Meta
                        avatar={<Avatar src={_contact.profilePicUrl} />}
                        title={<div>{_contact.name}</div>}
                        description={_contact.email}
                      />
                    </Col>
                    <Col md={6}>
                      <div className="department">Department</div>
                      <div className="department">{_contact.department}</div>
                    </Col>
                    <Col md={6}>
                      <div className="department">Phone</div>
                      <div className="department">{_contact.ipPhone}</div>
                    </Col>
                    <Col md={6}>
                      <div className="department">BirtDate</div>
                      <div className="department">
                        {moment(_contact.birthDate)?.format("MMM DD")}
                      </div>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>

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
  );
}

export default ContactList;
