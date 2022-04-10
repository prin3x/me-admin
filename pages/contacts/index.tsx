import React, { ReactElement } from "react";
import ContactTable from "../../components/contacts/ContactTable";
import LayoutHOC from "../../components/layouts/LayoutHOC";

function ContactsContainer(): ReactElement {
  return (
    <LayoutHOC>
      <ContactTable />
    </LayoutHOC>
  );
}

export default ContactsContainer;
