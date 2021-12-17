import { Head } from 'next/document';
import dynamic from 'next/dynamic';
import React, { ReactElement } from 'react';
import LayoutHOC from '../../../components/layouts/LayoutHOC';
const RichEditor = dynamic(
  () => import('../../../components/news-editor/RichEditor'),
  {
    ssr: false,
  }
);

function MakeNewPost(): ReactElement {
  return (
    <LayoutHOC>
      <div>
        <title>ME</title>
        <RichEditor />
      </div>
    </LayoutHOC>
  );
}

export default MakeNewPost;
