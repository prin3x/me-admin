import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  ICreateFormsRequestCategory,
  ICreateFormsRequestItem,
  IFormsRequest,
  IUpdateFormsRequestCategory,
  IUpdateFormsRequestItem,
} from "../../services/formsRequest/forms-request.model";
import { FORMS_REQUEST } from "../../services/formsRequest/forms-request.queryKey";
import {
  _alterCategoryIndex,
  _alterItemIndex,
  _createFormsRequestCategory,
  _createFormsRequestListItem,
  _getFormRequestContent,
  _removeFormsRequest,
  _removeFormsRequestCategory,
  _updateFormsRequestCategory,
  _updateFormsRequestListItem,
} from "../../services/formsRequest/forms-request.service";
import FormRequestTableList from "./FormRequestTableList";

type Props = {};

function FormRequestFetcher({}: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, isError } = useQuery(
    [FORMS_REQUEST],
    () => getContactServiceList()
  );

  async function getContactServiceList() {
    let res: IFormsRequest[] = [];
    try {
      res = await _getFormRequestContent();
    } catch (e) {
      message.error(e.error);
    }

    return res;
  }

  const onCreate = async (createDto: ICreateFormsRequestItem) => {
    try {
      await _createFormsRequestListItem(createDto);
      queryClient.invalidateQueries([FORMS_REQUEST]);
    } catch (e) {
      message.error(e.message);
    }
  };

  const onCreateNewObjectiveCategory = async (createDTO: ICreateFormsRequestCategory) => {
    try {
      await _createFormsRequestCategory(createDTO);
      queryClient.invalidateQueries([FORMS_REQUEST]);
    } catch (e) {
      message.error(e);
    }
  };

  const onUpdateItemList = async (item: IUpdateFormsRequestItem) => {
    try {
      await _updateFormsRequestListItem(item);
      queryClient.invalidateQueries([FORMS_REQUEST]);
    } catch (e) {
      console.log(`${e.message}`)
      message.error(`${e}`);
    }
  };

  const onUpdateObjectiveTitle = async (item: IUpdateFormsRequestCategory) => {
    try {
      await _updateFormsRequestCategory(item);
      queryClient.invalidateQueries([FORMS_REQUEST]);
    } catch (e) {
      message.error(e);
    }
  };

  const onRemoveListItem = async (id: string) => {
    try {
      await _removeFormsRequest(id);
      queryClient.invalidateQueries([FORMS_REQUEST]);
    } catch (e) {
      message.error(e);
    }
  };

  const onRemoveObjectiveCategory = async (id: string) => {
    try {
      await _removeFormsRequestCategory(id);
      queryClient.invalidateQueries([FORMS_REQUEST]);
    } catch (e) {
      message.error(e);
    }
  };

  const _onDecreaseIndex = async (id: string, index: number) => {
    try {
      await _alterItemIndex(id, index);
      queryClient.invalidateQueries([FORMS_REQUEST]);
      message.success("Successfully Swap");
    } catch (e) {
      message.error(e);
    }
  };

  const _onDecreaseCategoryIndex = async (id: string, index: number) => {
    try {
      await _alterCategoryIndex(id, index);
      queryClient.invalidateQueries([FORMS_REQUEST]);
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
      <FormRequestTableList
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

export default FormRequestFetcher;
