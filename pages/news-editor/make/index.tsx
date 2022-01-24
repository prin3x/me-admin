import dynamic from 'next/dynamic';
import React, { ReactElement } from 'react';
import LayoutHOC from '../../../components/layouts/LayoutHOC';
const PostEditor = dynamic(
  () => import('../../../components/post-editor/PostEditor'),
  {
    ssr: false,
  }
);

function MakeNewPost(): ReactElement {
  return (
    <LayoutHOC>
      <div>
        <title>ME</title>
        <PostEditor />
      </div>
    </LayoutHOC>
  );
}

export default MakeNewPost;
