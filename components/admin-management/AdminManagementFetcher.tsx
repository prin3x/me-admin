import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { IAdminData, IAdminModel } from "../../services/admin/admin.model";
import { ADMIN_QUERY } from "../../services/admin/admin.queryKey";
import { _getAdminList } from "../../services/admin/admin.service";
import AdminManagementTable from "./AdminManagementTable";

type Props = {};

function AdminManagementFetcher({}: Props) {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState({ page: 1, search: "" });
  const { data, isLoading, isSuccess, isError } = useQuery(
    [ADMIN_QUERY, query.page, query.search],
    () => getAdminList()
  );

  async function getAdminList(
    page: number = 1,
    search: string = ""
  ): Promise<IAdminData> {
    let res: IAdminData = {} as IAdminData;
    const query = `page=${page}&search=${search}`;
    try {
      res = await _getAdminList(query);
    } catch (e) {
      message.error("Error");
    }

    return res;
  }

  const onChangePage = (page) => {
    setQuery({ ...query, page });
  };

  if (isSuccess) return <AdminManagementTable adminRawData={data} onChangePage={onChangePage} />;

  if (isError) return <></>;

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
      </div>
    );
}

export default AdminManagementFetcher;
