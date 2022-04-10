import { ReactElement } from "react";
import RecentNewsPostList from "../../components/post-editor/RecentNewsPostList";
import LayoutHOC from "../../components/layouts/LayoutHOC";
import MakeNewBtn from "../../components/post-editor/MakeNewBtn";
interface Props {}

function BlogEditorContainer({}: Props): ReactElement {
  return (
    <LayoutHOC>
      <>
        <RecentNewsPostList />
      </>
    </LayoutHOC>
  );
}

export default BlogEditorContainer;
