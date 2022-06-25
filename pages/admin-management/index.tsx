import React from "react";
import AdminManagementFetcher from "../../components/admin-management/AdminManagementFetcher";
import LayoutHOC from "../../components/layouts/LayoutHOC";

type Props = {};

function AdminManageMent({}: Props) {
  return (
    <LayoutHOC>
      <AdminManagementFetcher />
    </LayoutHOC>
  );
}

export default AdminManageMent;
