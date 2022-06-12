import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  ICreateServiceContactItem,
  IServiceContact,
  IUpdateServiceContactCategory,
  IUpdateServiceContactItem,
} from "../../services/serviceContact/service-contact.model";
import { SERVICE_CONTACT } from "../../services/serviceContact/service-contact.queryKey";
import {
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

  const onCreateNewObjectiveCategory = async (title: string) => {
    try {
      await _createServiceContactCategory(title);
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
      />
    );

  if (isError) return <></>;
}

export default ServiceContactFetcher;
