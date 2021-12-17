import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Form, Input, Row, Upload } from 'antd';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';
import { DrawerType } from './ContactList';

const { useForm } = Form;

interface Props {
  isShowDrawerEditor: boolean;
  toggleDrawer: () => void;
  drawerMeta: any;
}

function DrawerEditor({
  isShowDrawerEditor,
  toggleDrawer,
  drawerMeta,
}: Props): ReactElement {
  const [form] = useForm();

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
          <Form form={form} layout='vertical'>
            <Form.Item name='picture'>
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              >
                <Avatar size={64} icon={<UserOutlined />} />
              </Upload>
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
