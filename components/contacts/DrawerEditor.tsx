import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Form, Input, Row, Upload } from 'antd';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';
import ImageUploader from '../utils/ImageUploader';
import { DrawerType } from './ContactList';

interface Props {
  isShowDrawerEditor: boolean;
  toggleDrawer: () => void;
  drawerMeta: any;
  form: any;
  createOrUpdateContact: () => void;
  setImage: any;
  image: any;
}

function DrawerEditor({
  isShowDrawerEditor,
  toggleDrawer,
  drawerMeta,
  form,
  createOrUpdateContact,
  setImage,
  image,
}: Props): ReactElement {
  useEffect(() => {
    if (drawerMeta) {
      form.setFieldsValue({ ...drawerMeta });
    }
  }, [drawerMeta]);

  return (
    <Drawer
      title='Drawer with extra actions'
      placement={'right'}
      width={300}
      onClose={toggleDrawer}
      visible={isShowDrawerEditor}
    >
      <Row justify='start'>
        <Col className='mx-auto'>
          <Form form={form} layout='vertical' onFinish={createOrUpdateContact}>
            <Form.Item name='picture'>
              <ImageUploader setImage={setImage} />
            </Form.Item>
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='email' label='Email'>
              <Input />
            </Form.Item>
            <Form.Item name='department' label='Department'>
              <Input />
            </Form.Item>
            <Form.Item name='division' label='Division'>
              <Input />
            </Form.Item>
            <Form.Item name='company' label='Company'>
              <Input />
            </Form.Item>
            <Form.Item name='ipPhone' label='Phone'>
              <Input />
            </Form.Item>
            <Row justify='end'>
              <Form.Item>
                {drawerMeta.type === DrawerType.EDIT ? (
                  <Button type='primary' htmlType='submit'>
                    Confirm Changes
                  </Button>
                ) : (
                  <Button type='primary' htmlType='submit'>
                    Confirm
                  </Button>
                )}
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
}

export default DrawerEditor;
