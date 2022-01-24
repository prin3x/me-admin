import { PlusCircleFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

interface Props {}

function MakeNewBtn({}: Props): ReactElement {
  const router = useRouter();
  return (
    <Row justify='center' className='mx-auto flex gap-5'>
      <Col span={6}>
        <div
          onClick={() => router.push('/news-editor/make')}
          className='w-full bg-secondary-color shadow-lg h-40 rounded-xl flex flex-col items-center justify-center cursor-pointer'
        >
          <div className='text-4xl font-bold flex gap-5 items-center'>
            <span>New Post</span>
            <PlusCircleFilled />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default MakeNewBtn;
