import React from "react";
import LayoutHOC from "../../components/layouts/LayoutHOC";
import ServiceContactFetcher from "../../components/service-contact/ServiceContactFetcher";

type Props = {};

function ServiceContactIndex({}: Props) {
  return (
    <LayoutHOC>
      <ServiceContactFetcher />
    </LayoutHOC>
  );
}

export default ServiceContactIndex;
