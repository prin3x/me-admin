import React from "react";
import LayoutHOC from "../../components/layouts/LayoutHOC";
import DepartmentManagementFetcher from "../../components/department-management/DepartmentManagementFetcher";

type Props = {};

function DepartmentManagement({}: Props) {
  return (
    <LayoutHOC>
      <DepartmentManagementFetcher />
    </LayoutHOC>
  );
}

export default DepartmentManagement;
