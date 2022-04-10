import { ReactElement } from 'react';
import RecentNewsPostList from '../../components/post-editor/RecentNewsPostList';
import LayoutHOC from '../../components/layouts/LayoutHOC';
import MakeNewBtn from '../../components/post-editor/MakeNewBtn';
interface Props {}

function BlogEditorContainer({}: Props): ReactElement {
  return (
    <LayoutHOC>
      <div className='pt-10 p-5'>
        <title>ME</title>
        <RecentNewsPostList />
      </div>
    </LayoutHOC>
  );
}

export default BlogEditorContainer;
