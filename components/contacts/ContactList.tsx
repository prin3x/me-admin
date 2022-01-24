import { Avatar, Button, Col, Form, List, Row } from 'antd';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  ContactStatus,
  StaffContact,
} from '../../services/contact/contact.model';
import { ALL_CONTACT } from '../../services/contact/contact.queryKey';
import {
  _createNewStaffContact,
  _getAllStaffContacts,
  _patchStaffContact,
} from '../../services/contact/contact.service';
import DrawerEditor from './DrawerEditor';

export enum DrawerType {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

const INITIAL_STATE = {
  visible: false,
  id: 0,
  profilePicUrl: 'https://ui-avatars.com/api/?rounded=true',
  name: '',
  nickname: '',
  company: '',
  department: '',
  division: '',
  ipPhone: '',
  email: '',
  status: ContactStatus.ENABLED,
  type: DrawerType.NEW,
};

function ContactList() {
  const queryClient = useQueryClient();
  const [image, setImage] = useState('')
  const [form] = Form.useForm();
  const { data, isLoading, isSuccess } = useQuery(
    [ALL_CONTACT],
    _getAllStaffContacts
  );

  const [drawerMeta, setDrawerMeta] = useState(INITIAL_STATE);
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
    setDrawerMeta(INITIAL_STATE);
    toggleDrawer();
  }

  function openDrawerByContact(_contact) {
    if (!_contact) return;

    let targetContact;

    targetContact = data.find((_person) => _person.id === _contact.id);

    if (!targetContact) return;

    setDrawerMeta({
      ...targetContact,
      type: DrawerType.EDIT,
      visible: true,
    });
  }

  async function createOrUpdateContact() {
    let res;
    form.validateFields().then(async (_result) => {
      const staffContactInstance = {} as StaffContact;
      staffContactInstance.name = _result.name;
      staffContactInstance.company = _result.company;
      staffContactInstance.nickname = _result.nickname;
      staffContactInstance.department = _result.department;
      staffContactInstance.division = _result.division;
      staffContactInstance.email = _result.email;
      staffContactInstance.ipPhone = _result.ipPhone;
      staffContactInstance.profilePicUrl = _result.profilePicUrl;
      staffContactInstance.birthDate = _result.birthDate;

      try {
        if (drawerMeta.type === DrawerType.NEW) {
          res = await _createNewStaffContact(staffContactInstance);
        } else {
          res = await _patchStaffContact(drawerMeta.id, staffContactInstance);
        }
        queryClient.invalidateQueries([ALL_CONTACT]);
      } catch (e) {
        console.error(e);
      }
    });
    toggleDrawer();

    return res;
  }

  return (
    <div className='container mx-auto mt-10'>
      <Row justify='end'>
        <Col>
          <Button onClick={handleCreateNewContact}>Add New</Button>
        </Col>
      </Row>
      <div className='p-10'>
        <List
          dataSource={isSuccess ? data : []}
          loading={isLoading}
          // loadMore={loadMore}
          renderItem={(_contact: StaffContact) => (
            <List.Item key={_contact.id}>
              <Row
                onClick={() => openDrawerByContact(_contact)}
                gutter={[32, 0]}
                className='w-full'
              >
                <Col md={6}>
                  <List.Item.Meta
                    avatar={<Avatar src={_contact.profilePicUrl} />}
                    title={<div>{_contact.name}</div>}
                    description={_contact.email}
                  />
                </Col>
                <Col md={6}>
                  <div className='department'>Department</div>
                  <div className='department'>{_contact.department}</div>
                </Col>
                <Col md={6}>
                  <div className='department'>Phone</div>
                  <div className='department'>{_contact.ipPhone}</div>
                </Col>
                <Col md={6}>
                  <div className='department'>BirtDate</div>
                  <div className='department'>{_contact.birthDate}</div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>

      {drawerMeta.visible && (
        <DrawerEditor
          isShowDrawerEditor={drawerMeta.visible}
          toggleDrawer={toggleDrawer}
          drawerMeta={drawerMeta}
          form={form}
          createOrUpdateContact={createOrUpdateContact}
          setImage={setImage}
          image={image}
        />
      )}
    </div>
  );
}

export default ContactList;
