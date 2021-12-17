import { PlusSquareOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { ReactElement } from 'react';
import LayoutHOC from '../../layouts/LayoutHOC';
interface Props {}

function BlogEditorContainer({}: Props): ReactElement {
  return (
    <LayoutHOC>
      <div className='py-10 px-10'>
        <Row justify='center' className='container mx-auto flex gap-5'>
          <Col span={6}>
            <div className='w-full bg-secondary-color shadow-lg hadow-blue-500/40 h-40 rounded-xl flex flex-col items-center justify-center cursor-pointer'>
              <div className='text-3xl flex gap-5 items-center'>
                <span>สร้างใหม่</span>
                <PlusSquareOutlined />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </LayoutHOC>
  );
}

export default BlogEditorContainer;
