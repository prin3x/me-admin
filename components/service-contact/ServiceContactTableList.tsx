import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  MoreOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React, { Fragment, useState } from "react";
import {
  ETypeOfEditing,
  ICreateServiceContactCategory,
  ICreateServiceContactItem,
  IServiceContact,
  IServiceContactDetail,
  IUpdateServiceContactCategory,
  IUpdateServiceContactItem,
} from "../../services/serviceContact/service-contact.model";
import { _createContactServiceListItem } from "../../services/serviceContact/service-contact.service";
import ServiceContactDrawer from "./ServiceContactDrawer";
import ServiceContactListItemDrawer from "./ServiceContactListItemDrawer";

const INIT_EDIT_LIST = {
  id: "",
  objective: "",
  contactID: "",
  contactPhoneNumber: "",
  name: "",
  isEditing: false,
};

type Props = {
  data: IServiceContact[];
  onCreate: (createDto: ICreateServiceContactItem) => void;
  onCreateNewObjectiveCategory: (title: string) => void;
  onUpdateItemList: (items: IUpdateServiceContactItem) => void;
  _onUpdateObjectiveTitle: (items: IUpdateServiceContactCategory) => void;
  _onRemoveListItem: (id: string) => void;
  _onRemoveObjectiveCategory: (id: string) => void;
};

function ServiceContactTableList({
  data,
  onCreate,
  onCreateNewObjectiveCategory,
  onUpdateItemList,
  _onUpdateObjectiveTitle,
  _onRemoveListItem,
  _onRemoveObjectiveCategory
}: Props) {
  const [form] = Form.useForm();
  const [isAddingNewListItem, setIsAddingNewListItem] = useState({
    categoryId: "",
    isAdding: false,
  });
  const [editObjectiveData, setEditObjectiveData] = useState({
    categoryId: "",
    title: "",
    isEditing: false,
    type: ETypeOfEditing.CREATE,
  });
  const [editListItemData, setEditListItemData] = useState(INIT_EDIT_LIST);

  const onToggleListItemToEdit = (item?: IServiceContactDetail) => {
    let currentState = { ...editListItemData };
    if (currentState.isEditing) {
      currentState = INIT_EDIT_LIST;
    } else {
      currentState = { ...editListItemData, ...item, id: item.id + "" };
      currentState.isEditing = true;
    }

    setEditListItemData(currentState);
  };

  const onCickAddNewListItem = (id?: string) => {
    let currentState = { ...isAddingNewListItem };
    if (currentState.isAdding && currentState.categoryId === id) {
      currentState.isAdding = false;
      currentState.categoryId = "";
    } else {
      currentState.isAdding = true;
      currentState.categoryId = id;
    }
    setIsAddingNewListItem(currentState);
  };

  const onToggleCategoryDrawer = (
    item?: IServiceContact,
    type: ETypeOfEditing = ETypeOfEditing.CREATE
  ) => {
    let currentState = { ...editObjectiveData };
    if (currentState.isEditing) {
      currentState.isEditing = false;
      currentState.title = "";
      currentState.categoryId = "";
    } else {
      currentState = {
        ...currentState,
        title: item ? item.title : "",
        categoryId: item ? item.id + "" : "",
      };
      currentState.isEditing = true;
    }

    currentState.type = type;
    setEditObjectiveData(currentState);
  };

  const onClickConfirmCreateNewListItem = async () => {
    let set: ICreateServiceContactItem = {} as ICreateServiceContactItem;
    try {
      await form.validateFields();
      set = form.getFieldsValue();
      set.categoryDetail = isAddingNewListItem.categoryId + "";

      await onCreate(set);
      onCickAddNewListItem();
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateItem = (formVal: ICreateServiceContactItem) => {
    let set: IUpdateServiceContactItem = {} as IUpdateServiceContactItem;
    set = { ...formVal, id: editListItemData.id };
    onUpdateItemList(set);
    onToggleListItemToEdit();
  };

  const onUpdateObjectiveTitle = (formVal: ICreateServiceContactCategory) => {
    let set: IUpdateServiceContactCategory =
      {} as IUpdateServiceContactCategory;
    set.title = formVal.title;
    set.id = editObjectiveData.categoryId;
    _onUpdateObjectiveTitle(set);
    onToggleCategoryDrawer();
  };

  const onRemoveListItem = (id: string) => {
    _onRemoveListItem(id);
    onToggleListItemToEdit();
  };

  const onRemoveObjectiveCategory = (id: string) => {
    _onRemoveObjectiveCategory(id);
    onToggleCategoryDrawer();
  };

  return (
    <div className="px-10 pb-20">
      <Row className="h-40 items-center" justify="start">
        <Col span={24} offset={1}>
          <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
            Service Contacts
          </div>
        </Col>
      </Row>
      <div className="flex justify-end">
        <Button
          className="w-[15rem]"
          style={{ height: "5rem", fontSize: "2rem", fontWeight: "bold" }}
          type="link"
          onClick={() => onToggleCategoryDrawer()}
        >
          <div className="flex items-center">
            <PlusCircleFilled />
            <p className="ml-3 mb-0">ADD OBJECTIVE</p>
          </div>
        </Button>
      </div>
      <Form form={form} layout="inline">
        <table className="border-collapse border border-slate-300 w-full bg-white">
          <thead>
            <tr
              style={{ backgroundColor: "#0F52BA" }}
              className="text-white text-[30px]"
            >
              <th className="border border-slate-300 w-[45%]">OBJECTIVE</th>
              <th className="border border-slate-300 w-[40%]">CONTACT</th>
              <th className="border border-slate-300 w-[15%]">NAME</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <Fragment key={`${item.id}-header`}>
                <tr
                  style={{ backgroundColor: "rgba(22,85,183,0.1)" }}
                  className="text-[24px]"
                >
                  <td
                    className="font-bold border border-slate-300"
                    style={{ color: "#1655B7" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <EditOutlined
                          onClick={() =>
                            onToggleCategoryDrawer(item, ETypeOfEditing.UPDATED)
                          }
                          className="mr-3"
                        />{" "}
                        {item.title}
                      </div>
                      <div
                        className="flex items-center mr-5"
                        onClick={() => onCickAddNewListItem(item.id)}
                      >
                        <PlusCircleFilled className="ml-5" />
                        <p className="-mb-1 ml-2">?????????????????????????????????</p>
                      </div>
                    </div>
                  </td>
                  <td className="border border-slate-300"></td>
                  <td className="border border-slate-300"></td>
                </tr>
                {item.serviceContactDetail.map((contact) => (
                  <tr key={contact.id} className="text-[24px]">
                    <td className="border border-slate-300">
                      <div className="flex items-center">
                        <MoreOutlined
                          className="cursor-pointer"
                          onClick={() => onToggleListItemToEdit(contact)}
                        />
                        {contact.objective}
                      </div>
                    </td>
                    <td className="border border-slate-300 text-center">
                      <p className="mb-0">{contact.contactID}</p>
                      <p
                        className="mb-0 text-[19px]"
                        style={{ color: "#0F52BA" }}
                      >
                        {contact.contactPhoneNumber}
                      </p>
                    </td>
                    <td className="border border-slate-300 text-center">
                      {contact.name}
                    </td>
                  </tr>
                ))}
                {isAddingNewListItem.categoryId === item.id &&
                  isAddingNewListItem.isAdding && (
                    <tr className="h-10">
                      <td className="border border-slate-300 pl-7">
                        <div className="flex">
                          <Form.Item
                            rules={[
                              { required: true, message: "Please enter title" },
                            ]}
                            name="objective"
                            className="m-0 w-full"
                          >
                            <Input
                              type="text"
                              placeholder="??????????????????????????????"
                              className="w-full"
                            />
                          </Form.Item>
                        </div>
                      </td>
                      <td className="border border-slate-300 pl-7">
                        <div className="flex gap-3">
                          <Form.Item
                            rules={[{ required: true }]}
                            name="contactID"
                            label="Contact ID"
                          >
                            <Input
                              type="text"
                              placeholder="ID ?????????????????????"
                              className=""
                            />
                          </Form.Item>
                          <Form.Item
                            name="contactPhoneNumber"
                            label="Contact Phone"
                          >
                            <Input
                              type="text"
                              placeholder="??????????????? ??????????????????"
                              className=""
                            />
                          </Form.Item>
                        </div>
                      </td>
                      <td className="border border-slate-300 pl-7">
                        <div className="flex items-center justify-around">
                          <Form.Item rules={[{ required: true }]} name="name">
                            <Input
                              type="text"
                              placeholder="???????????? Contact"
                              className=""
                            />
                          </Form.Item>
                          <CheckCircleOutlined
                            onClick={onClickConfirmCreateNewListItem}
                            style={{ color: "green" }}
                            className="cursor-pointer"
                          />
                          <CloseCircleOutlined
                            style={{ color: "red" }}
                            className="cursor-pointer"
                            onClick={() => onCickAddNewListItem(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </Form>

      <ServiceContactDrawer
        editObjectiveData={editObjectiveData}
        onClose={onToggleCategoryDrawer}
        onCreateNewObjectiveCategory={onCreateNewObjectiveCategory}
        onUpdate={onUpdateObjectiveTitle}
        onRemove={onRemoveObjectiveCategory}
      />

      <ServiceContactListItemDrawer
        editListItemData={editListItemData}
        onClose={onToggleListItemToEdit}
        onUpdate={onUpdateItem}
        onRemove={onRemoveListItem}
      />
    </div>
  );
}

export default ServiceContactTableList;
