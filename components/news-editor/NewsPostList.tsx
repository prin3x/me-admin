import { Col, Image, List, Row } from 'antd';
import React, { ReactElement } from 'react';

interface Props {}

const mockData = [
  {
    id: 1,
    title: 'Urgent',
    content: 'ขอความร่วมมืิอออออออออ',
    status: 'enabled',
    adminId: 1,
    categoryId: 1,
    createdDate: '2021-12-15T16:48:19.000Z',
    updatedDate: '2021-12-15T16:48:48.000Z',
  },
  {
    id: 2,
    title: 'Urgent',
    content: 'ขอความร่วมมืิอออออออออ',
    status: 'enabled',
    adminId: 1,
    categoryId: 1,
    createdDate: '2021-12-15T16:48:24.000Z',
    updatedDate: '2021-12-15T16:48:52.000Z',
  },
];

function NewsPostList({}: Props): ReactElement {
  return (
    <div className='mt-10'>
      <List
        className='p-5'
        dataSource={mockData}
        renderItem={(_contact) => (
          <List.Item key={_contact.id}>
            <Row gutter={[32, 0]} className='w-full' align='middle'>
              <Col md={6}>
                <div className='thumnail'>
                  <Image src='https://ui-avatars.com/api/?rounded=true' />
                </div>
              </Col>
              <Col md={6}>
                <List.Item.Meta description={_contact.content} />
              </Col>
              <Col md={6}>
                <div className='department'>{_contact.status}</div>
              </Col>
              <Col md={6}>
                {new Date(_contact.updatedDate).toLocaleDateString()}
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default NewsPostList;
