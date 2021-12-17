import React, { ReactElement } from 'react';
import ContactList from '../../components/contacts/ContactList';
import LayoutHOC from '../../layouts/LayoutHOC';

function ContactsContainer(): ReactElement {
  return (
    <LayoutHOC>
      <>
        <ContactList />
      </>
    </LayoutHOC>
  );
}

export default ContactsContainer;
