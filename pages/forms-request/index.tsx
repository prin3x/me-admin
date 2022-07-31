import React from "react";
import FormRequestFetcher from "../../components/form-request/FormRequestFetcher";
import LayoutHOC from "../../components/layouts/LayoutHOC";

type Props = {};

function ServiceContactIndex({}: Props) {
  return (
    <LayoutHOC>
      <FormRequestFetcher />
    </LayoutHOC>
  );
}

export default ServiceContactIndex;
