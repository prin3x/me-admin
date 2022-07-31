import {
  CloseOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import { useEffect } from "react";
import {
  createCompany,
  removeCompany,
} from "../../services/company/company.service";
import {
  createDepartments,
  removeDepartments,
} from "../../services/department/department.service";
import {
  createDivisions,
  removeDivisions,
} from "../../services/division/division.service";
import ImageUploader from "../utils/ImageUploader";
import { DrawerType } from "./ContactTable";

const { DatePicker }: any = require("antd");

export enum CONTACT_OPTIONS {
  DEPARTMENT = "department",
  DIVISION = "division",
  COMPANY = "company",
}

interface Props {
  isShowDrawerEditor: boolean;
  toggleDrawer: (_state) => void;
  drawerMeta: any;
  form: any;
  createOrUpdateContact: () => void;
  setImage: any;
  image: any;
  options: any;
  setChoicesFromApi: () => void;
}

function DrawerEditor({
  isShowDrawerEditor,
  toggleDrawer,
  drawerMeta,
  form,
  createOrUpdateContact,
  setImage,
  image,
  options,
  setChoicesFromApi,
}: Props): ReactElement {
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const [division, setDivision] = useState("");
  useEffect(() => {
    if (drawerMeta) {
      form.setFieldsValue({
        ...drawerMeta,
        birthDate: moment(drawerMeta.birthDate),
      });
    }
  }, [drawerMeta]);

  async function addNewItem(contactType: CONTACT_OPTIONS, newItem: string) {
    try {
      contactType === CONTACT_OPTIONS.COMPANY
        ? await createCompany({ company: newItem })
        : contactType === CONTACT_OPTIONS.DEPARTMENT
        ? await createDepartments({ department: newItem })
        : contactType === CONTACT_OPTIONS.DIVISION
        ? await createDivisions({ division: newItem })
        : null;

      await setChoicesFromApi();
    } catch (error) {
      console.error(error);
    } finally {
      setDepartment("");
      setCompany("");
      setDivision("");
    }
  }

  async function removeItem(contactType: CONTACT_OPTIONS, id: number) {
    try {
      contactType === CONTACT_OPTIONS.COMPANY
        ? await removeCompany(id)
        : contactType === CONTACT_OPTIONS.DEPARTMENT
        ? await removeDepartments(id)
        : contactType === CONTACT_OPTIONS.DIVISION
        ? await removeDivisions(id)
        : null;

      await setChoicesFromApi();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Drawer
      title="Add new contact"
      placement={"right"}
      width={300}
      onClose={toggleDrawer}
      visible={isShowDrawerEditor}
      className="new-contact-drawer"
      destroyOnClose
    >
      <Row justify="start">
        <Col className="w-full">
          <Form form={form} layout="vertical" onFinish={createOrUpdateContact}>
            <Form.Item name="picture">
              <p>Add Image Size 1:1 </p>
              <ImageUploader
                setImage={setImage}
                currentImageUrl={drawerMeta?.profilePicUrl || undefined}
              />
            </Form.Item>
            <Form.Item name="name" label="Name(EN)">
              <Input />
            </Form.Item>
            <Form.Item name="nameTH" label="Name(TH)">
              <Input />
            </Form.Item>
            <Form.Item name="nicjname" label="Nickname">
              <Input />
            </Form.Item>
            <Form.Item name="position" label="Position">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="department" label="Department">
              <Select
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space align="center" style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        onChange={(e) => setDepartment(e.target.value)}
                        value={department}
                      />
                      <Typography.Link
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() =>
                          addNewItem(CONTACT_OPTIONS.DEPARTMENT, department)
                        }
                      >
                        <PlusOutlined /> Add item
                      </Typography.Link>
                    </Space>
                  </>
                )}
              >
                {options.department &&
                  options.department.map((dep) => (
                    <Select.Option key={dep.id} value={dep.department}>
                      <div className="flex justify-between">
                        <span>
                          {dep.department.length > 25
                            ? dep.department.slice(0, 25)
                            : dep.department}
                        </span>
                        <span className="z-30">
                          <CloseOutlined
                            className="delete--contact-options"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(CONTACT_OPTIONS.DEPARTMENT, dep.id);
                            }}
                          />
                        </span>
                      </div>
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="division" label="Division">
              <Select
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space align="center" style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        onChange={(e) => setDivision(e.target.value)}
                        value={division}
                      />
                      <Typography.Link
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() =>
                          addNewItem(CONTACT_OPTIONS.DIVISION, division)
                        }
                      >
                        <PlusOutlined /> Add item
                      </Typography.Link>
                    </Space>
                  </>
                )}
              >
                {options.division &&
                  options.division.map((div) => (
                    <Select.Option key={div.id} value={div.division}>
                      <div className="flex justify-between">
                        <span>
                          {div.division.length > 25
                            ? div.division.slice(0, 25)
                            : div.division}
                        </span>
                        <span>
                          <CloseOutlined
                            className="delete--contact-options"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(CONTACT_OPTIONS.DIVISION, div.id);
                            }}
                          />
                        </span>
                      </div>
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="company" label="Company">
              <Select
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space align="center" style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        onChange={(e) => setCompany(e.target.value)}
                        value={company}
                      />
                      <Typography.Link
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() =>
                          addNewItem(CONTACT_OPTIONS.COMPANY, company)
                        }
                      >
                        <PlusOutlined /> Add item
                      </Typography.Link>
                    </Space>
                  </>
                )}
              >
                {options.company &&
                  options.company.map((comp) => (
                    <Select.Option key={comp.id} value={comp.company}>
                      <div className="flex justify-between">
                        <span>
                          {comp.company.length > 25
                            ? comp.company.slice(0, 25)
                            : comp.company}
                        </span>
                        <span>
                          <CloseOutlined
                            className="delete--contact-options"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(CONTACT_OPTIONS.COMPANY, comp.id);
                            }}
                          />
                        </span>
                      </div>
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="ipPhone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item
              name="birthDate"
              label="BirthDay"
              initialValue={moment()}
            >
              <DatePicker format="MM-DD" picker="date" mode="date" />
            </Form.Item>
            <Row justify="end">
              <Form.Item>
                {drawerMeta.type === DrawerType.EDIT ? (
                  <Button type="primary" htmlType="submit">
                    Confirm Changes
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit">
                    Confirm
                  </Button>
                )}
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
}

export default DrawerEditor;
