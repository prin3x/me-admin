import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  ICreateServiceContactCategory,
  ICreateServiceContactItem,
  IServiceContact,
  IUpdateServiceContactCategory,
  IUpdateServiceContactItem,
} from "../../services/serviceContact/service-contact.model";
import { SERVICE_CONTACT } from "../../services/serviceContact/service-contact.queryKey";
import {
  _alterCategoryIndex,
  _alterItemIndex,
  _createContactServiceListItem,
  _createServiceContactCategory,
  _getContactServiceList,
  _removeContactService,
  _removeContactServiceCategory,
  _updateContactServiceListItem,
  _updateServiceContactCategory,
} from "../../services/serviceContact/service-contact.service";
import ServiceContactTableList from "./ServiceContactTableList";

type Props = {};

function ServiceContactFetcher({}: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, isError } = useQuery(
    [SERVICE_CONTACT],
    () => getContactServiceList()
  );

  async function getContactServiceList() {
    let res: IServiceContact[] = [];
    try {
      res = await _getContactServiceList();
    } catch (e) {
      message.error(e.error);
    }

    return res;
  }

  const onCreate = async (createDto: ICreateServiceContactItem) => {
    try {
      await _createContactServiceListItem(createDto);
      queryClient.invalidateQueries([SERVICE_CONTACT]);
    } catch (e) {
      message.error(e.message);
    }
  };

  const onCreateNewObjectiveCategory = async (
    createDto: ICreateServiceContactCategory
  ) => {
    try {
      await _createServiceContactCategory(createDto);
      queryClient.invalidateQueries([SERVICE_CONTACT]);
    } catch (e) {
      message.error(e);
    }
  };

  const onUpdateItemList = async (item: IUpdateServiceContactItem) => {
    try {
      await _updateContactServiceListItem(item);
      queryClient.invalidateQueries([SERVICE_CONTACT]);
    } catch (e) {
      message.error(e);
    }
  };

  const onUpdateObjectiveTitle = async (
    item: IUpdateServiceContactCategory
  ) => {
    try {
      await _updateServiceContactCategory(item);
      queryClient.invalidateQueries([SERVICE_CONTACT]);
    } catch (e) {
      message.error(e);
    }
  };

  const onRemoveListItem = async (id: string) => {
    try {
      await _removeContactService(id);
      queryClient.invalidateQueries([SERVICE_CONTACT]);
    } catch (e) {
      message.error(e);
    }
  };

  const onRemoveObjectiveCategory = async (id: string) => {
    try {
      await _removeContactServiceCategory(id);
      queryClient.invalidateQueries([SERVICE_CONTACT]);
    } catch (e) {
      message.error(e);
    }
  };

  const _onDecreaseIndex = async (id: string, index: number) => {
    try {
      await _alterItemIndex(id, index);
      queryClient.invalidateQueries([SERVICE_CONTACT]);
      message.success("Successfully Swap");
    } catch (e) {
      message.error(e);
    }
  };

  const _onDecreaseCategoryIndex = async (id: string, index: number) => {
    try {
      await _alterCategoryIndex(id, index);
      queryClient.invalidateQueries([SERVICE_CONTACT]);
      message.success("Successfully Swap");
    } catch (e) {
      message.error(e);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
      </div>
    );

  if (isSuccess)
    return (
      <ServiceContactTableList
        data={data}
        onCreate={onCreate}
        onCreateNewObjectiveCategory={onCreateNewObjectiveCategory}
        onUpdateItemList={onUpdateItemList}
        _onUpdateObjectiveTitle={onUpdateObjectiveTitle}
        _onRemoveListItem={onRemoveListItem}
        _onRemoveObjectiveCategory={onRemoveObjectiveCategory}
        _onDecreaseIndex={_onDecreaseIndex}
        _onDecreaseCategoryIndex={_onDecreaseCategoryIndex}
      />
    );

  if (isError) return <></>;
}

export default ServiceContactFetcher;
