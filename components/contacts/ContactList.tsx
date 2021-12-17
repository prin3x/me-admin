import { Avatar, Button, Col, List, Row } from 'antd';
import { useState } from 'react';
import DrawerEditor from './DrawerEditor';

export enum DrawerType {
  EDIT = 'EDIT',
  NEW = 'NEW'
}

const mockData = [
  {
    id: 1,
    picture: 'https://ui-avatars.com/api/?rounded=true',
    name: 'Piko',
    email: 'pik123o@gmain.com',
  },
  {
    id: 2,
    picture: 'https://ui-avatars.com/api/?rounded=true',
    name: 'Piko2',
    email: 'pik13o@gmain.com',
  },
  {
    id: 3,
    picture: 'https://ui-avatars.com/api/?rounded=true',
    name: 'Piko3',
    email: 'pi34ko@gmain.com',
  },
  {
    id: 4,
    picture: 'https://ui-avatars.com/api/?rounded=true',
    name: 'Piko4',
    email: 'pik345o@gmain.com',
  },
  {
    id: 5,
    picture: 'https://ui-avatars.com/api/?rounded=true',
    name: 'Piko5',
    email: 'pik345o@gmain.com',
  },
];

function ContactList() {
  const [drawerMeta, setDrawerMeta] = useState({
    visible: false,
    id: 0,
    picture: '',
    name: '',
    email: '',
    type: DrawerType.NEW
  });
  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button type='primary'>Load More</Button>
    </div>
  );
  function toggleDrawer() {
    setDrawerMeta({
      ...drawerMeta,
      visible: drawerMeta.visible ? false : true,
    });
  }

  function handleCreateNewContact() {
    setDrawerMeta({
      id: 0,
      picture: '',
      name: '',
      email: '',
      type: DrawerType.NEW,
      visible: true,
    });
  }

  function openDrawerByContact(_contact) {
    if (!_contact) return;

    let targetContact;

    targetContact = mockData.find((_person) => _person.id === _contact.id);

    if (!targetContact) return;

    setDrawerMeta({
      ...targetContact,
      type: DrawerType.EDIT,
      visible: true,
    });
  }

  return (
    <div className='container mx-auto mt-10'>
      <Row justify='end'>
        <Col>
          <Button onClick={handleCreateNewContact}>Add New</Button>
        </Col>
      </Row>
      <List
        className='p-5'
        dataSource={mockData}
        loadMore={loadMore}
        renderItem={(_contact) => (
          <List.Item key={_contact.id}>
            <Row
              onClick={() => openDrawerByContact(_contact)}
              gutter={[32, 0]}
              className='w-full'
            >
              <Col md={8}>
                <List.Item.Meta
                  avatar={<Avatar src={_contact.picture} />}
                  title={<div>{_contact.name}</div>}
                  description={_contact.email}
                />
              </Col>
              <Col md={8}>
                <div className='department'>Department</div>
              </Col>
              <Col md={8}>birthDate</Col>
            </Row>
          </List.Item>
        )}
      />
      <DrawerEditor
        isShowDrawerEditor={drawerMeta.visible}
        toggleDrawer={toggleDrawer}
        drawerMeta={drawerMeta}
      />
    </div>
  );
}

export default ContactList;
