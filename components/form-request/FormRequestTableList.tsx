import {
  ArrowUpOutlined,
  CaretUpOutlined,
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
  ICreateFormsRequestCategory,
  ICreateFormsRequestItem,
  IFormsRequest,
  IFormsRequestDetail,
  IUpdateFormsRequestCategory,
  IUpdateFormsRequestItem,
} from "../../services/formsRequest/forms-request.model";
import FormRequestCategoryDrawer from "./FormRequestCategoryDrawer";
import FormRequestListDrawer from "./FormRequestListDrawer";

type Props = {
  data: IFormsRequest[];
  onCreate: (createDto: ICreateFormsRequestItem) => void;
  onCreateNewObjectiveCategory: (
    createDTO: ICreateFormsRequestCategory
  ) => void;
  onUpdateItemList: (items: IUpdateFormsRequestItem) => void;
  _onUpdateObjectiveTitle: (items: IUpdateFormsRequestCategory) => void;
  _onRemoveListItem: (id: string) => void;
  _onRemoveObjectiveCategory: (id: string) => void;
  _onDecreaseIndex: (id: string, index: number) => void;
  _onDecreaseCategoryIndex: (id: string, index: number) => void;
};

export interface IFormRequestEditState {
  id: string;
  content: string;
  downloadLink: string;
  isEditing: boolean;
}

const INIT_EDIT_LIST = {
  id: "",
  content: "",
  downloadLink: "",
  isEditing: false,
};

function FormRequestTableList({
  data,
  onCreate,
  onCreateNewObjectiveCategory,
  onUpdateItemList,
  _onUpdateObjectiveTitle,
  _onRemoveListItem,
  _onRemoveObjectiveCategory,
  _onDecreaseIndex,
  _onDecreaseCategoryIndex,
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
  const [editListItemData, setEditListItemData] =
    useState<IFormRequestEditState>(INIT_EDIT_LIST);

  const onToggleListItemToEdit = (item?: IFormsRequestDetail) => {
    let currentState = { ...editListItemData };
    if (currentState.isEditing) {
      currentState = INIT_EDIT_LIST;
    } else {
      currentState = { ...currentState, ...item, id: item.id + "" };
      currentState.isEditing = true;
    }

    setEditListItemData(currentState);
  };

  const onCickAddNewListItem = (id?: string) => {
    form.resetFields();
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
    item?: IFormsRequest,
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
    let set: ICreateFormsRequestItem = {} as ICreateFormsRequestItem;
    try {
      const formValue = await form.validateFields();
      set = { ...formValue };
      set.categoryId = isAddingNewListItem.categoryId + "";
      const listOfCurrentCategory = data.find(
        (item) => item.id === isAddingNewListItem.categoryId
      );
      const lastIndex = listOfCurrentCategory.formsRequestDetail.length + 1;

      set.index = lastIndex;

      console.log(set,'set')

      await onCreate(set);
      onCickAddNewListItem();
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateItem = (formVal: ICreateFormsRequestItem) => {
    let set: IUpdateFormsRequestItem = {} as IUpdateFormsRequestItem;
    set = { ...formVal, id: editListItemData.id };
    onUpdateItemList(set);
    onToggleListItemToEdit();
  };

  const onUpdateObjectiveTitle = (formVal: ICreateFormsRequestCategory) => {
    let set: IUpdateFormsRequestCategory = {} as IUpdateFormsRequestCategory;
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

  const onDecreaseIndex = (id: string, index: number, type = "item") => {
    const newIndex = index <= 1 ? 1 : index - 1;

    if (newIndex === index) return;

    if (type === "item") {
      _onDecreaseIndex(id, newIndex);
    } else {
      _onDecreaseCategoryIndex(id, newIndex);
    }
  };

  const onCreateNewCategory = (title: string) => {
    let set: ICreateFormsRequestCategory = {} as ICreateFormsRequestCategory;
    set.title = title;
    set.index = data.length + 1;

    onCreateNewObjectiveCategory(set);
  };

  return (
    <div className="px-10 pb-20">
      <Row className="h-40 items-center" justify="start">
        <Col span={24} offset={1}>
          <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
            Forms Request
          </div>
        </Col>
      </Row>
      <div className="flex justify-end">
        <Button
          className="w-[15rem]"
          style={{ height: "5rem", fontSize: "2rem", fontWeight: "bold" }}
          type="link"
        >
          <div
            className="flex items-center"
            onClick={() => onToggleCategoryDrawer()}
          >
            <PlusCircleFilled />
            <p className="ml-3 mb-0">ADD CATEGORY</p>
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
              <th className="border border-slate-300 w-[45%]">CONTENT</th>
              <th className="border border-slate-300 w-[40%]">LINK</th>
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
                    <div className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <EditOutlined
                          onClick={() =>
                            onToggleCategoryDrawer(item, ETypeOfEditing.UPDATED)
                          }
                          className="mr-3"
                        />{" "}
                        {item.title}
                      </div>
                      <div className="flex items-center mr-5 cursor-pointer">
                        <PlusCircleFilled
                          onClick={() => onCickAddNewListItem(item.id)}
                          className="ml-5"
                        />
                        <p
                          className="-mb-1 ml-2"
                          onClick={() => onCickAddNewListItem(item.id)}
                        >
                          เพิ่มรายการ
                        </p>
                        <CaretUpOutlined
                          onClick={() =>
                            onDecreaseIndex(item.id, item.index, "category")
                          }
                          className="ml-3 block cursor-pointer bg-white rounded-full"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border border-slate-300"></td>
                </tr>
                {item?.formsRequestDetail.map((contact) => (
                  <tr key={contact.id} className="text-[24px]">
                    <td className="border border-slate-300">
                      <div className="flex items-center">
                        <MoreOutlined
                          onClick={() => onToggleListItemToEdit(contact)}
                          className="cursor-pointer"
                        />
                        {contact.content}
                        <ArrowUpOutlined
                          onClick={() =>
                            onDecreaseIndex(contact.id, contact.index)
                          }
                          style={{ color: "white" }}
                          className="ml-3 block cursor-pointer bg-gray-600 rounded-full"
                        />
                      </div>
                    </td>
                    <td className="border border-slate-300 text-center">
                      <p className="mb-0">{contact.downloadLink || contact.filePath}</p>
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
                            name="content"
                            className="m-0 w-[70%]"
                          >
                            <Input type="text" placeholder="ชื่อแบบฟอร์ม" />
                          </Form.Item>
                        </div>
                      </td>
                      <td className="border border-slate-300 pl-7">
                        <div className="flex items-center justify-center">
                          <Form.Item
                            rules={[{ required: true }]}
                            name="downloadLink"
                          >
                            <Input
                              type="text"
                              placeholder="Link"
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
                            className="cursor-pointer ml-3"
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

      <FormRequestCategoryDrawer
        editObjectiveData={editObjectiveData}
        onClose={onToggleCategoryDrawer}
        onCreateNewObjectiveCategory={onCreateNewCategory}
        onUpdate={onUpdateObjectiveTitle}
        onRemove={onRemoveObjectiveCategory}
      />

      <FormRequestListDrawer
        editListItemData={editListItemData}
        onClose={onToggleListItemToEdit}
        onUpdate={onUpdateItem}
        onRemove={onRemoveListItem}
      />
    </div>
  );
}

export default FormRequestTableList;
