import { PlusCircleFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import NewsPostList from '../../components/news-editor/NewsPostList';
import LayoutHOC from '../../components/layouts/LayoutHOC';
import MakeNewBtn from '../../components/news-editor/MakeNewBtn';
interface Props {}

function BlogEditorContainer({}: Props): ReactElement {
  return (
    <LayoutHOC>
      <div className='container p-10'>
        <title>ME</title>
        <MakeNewBtn />
        <NewsPostList />
      </div>
    </LayoutHOC>
  );
}

export default BlogEditorContainer;
