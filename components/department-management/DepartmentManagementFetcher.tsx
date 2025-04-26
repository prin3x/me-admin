import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getDepartments } from "../../services/department/department.service";
import DepartmentManagementTable from "./DepartmentManagementTable";

type Props = {};

function DepartmentManagementFetcher({}: Props) {
  const [query, setQuery] = useState({ page: 1, search: "" });
  const { data, isLoading, isSuccess, isError } = useQuery(
    ["departments", query.page, query.search],
    () => getDepartments()
  );

  const onChangePage = (page: number) => {
    setQuery({ ...query, page });
  };

  if (isSuccess)
    return (
      <DepartmentManagementTable
        departments={data}
        onChangePage={onChangePage}
      />
    );

  if (isError) return <></>;

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
      </div>
    );
}

export default DepartmentManagementFetcher;
