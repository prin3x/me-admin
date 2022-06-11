import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { IServiceContact } from "../../services/serviceContact/service-contact.model";
import { SERVICE_CONTACT } from "../../services/serviceContact/service-contact.queryKey";
import { _getContactServiceList } from "../../services/serviceContact/service-contact.service";
import ServiceContactTableList from "./ServiceContactTableList";

type Props = {};

function ServiceContactFetcher({}: Props) {
  const { data, isLoading, isSuccess, isError } = useQuery(
    [SERVICE_CONTACT],
    () => getContactServiceList()
  );

  async function getContactServiceList() {
    let res: IServiceContact[];
    try {
      res = await _getContactServiceList();
    } catch (e) {
      message.error(e);
    }

    return res;
  }

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
      </div>
    );

  if (isSuccess) return <ServiceContactTableList data={data} />;

  if (isError) return <></>;
}

export default ServiceContactFetcher;
