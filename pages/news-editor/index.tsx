import { PlusCircleFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import RecentNewsPostList from '../../components/post-editor/RecentNewsPostList';
import LayoutHOC from '../../components/layouts/LayoutHOC';
import MakeNewBtn from '../../components/post-editor/MakeNewBtn';
interface Props {}

function BlogEditorContainer({}: Props): ReactElement {
  return (
    <LayoutHOC>
      <div className='container p-10'>
        <title>ME</title>
        <MakeNewBtn />
        <RecentNewsPostList />
      </div>
    </LayoutHOC>
  );
}

export default BlogEditorContainer;
