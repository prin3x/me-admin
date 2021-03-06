import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import LayoutHOC from "../../../components/layouts/LayoutHOC";
import { GET_ONE_POST } from "../../../services/post/post.queryKey";
import { _getOnePost } from "../../../services/post/post.service";

const PostEditor: any = dynamic(
  () => import("../../../components/post-editor/PostEditor"),
  {
    ssr: false,
  }
);

function ExistingNewsEditor({}): ReactElement {
  const { query } = useRouter();
  const { data, isLoading, isSuccess } = useQuery(
    [GET_ONE_POST, query.slug],
    () => getOnePost(query.slug as string)
  );

  function getOnePost(slug: string) {
    if (!slug) return;
    return _getOnePost(slug);
  }

  return (
    <LayoutHOC>
      <>
        {!isLoading && isSuccess && (
          <PostEditor initialContent={data} slug={query.slug} />
        )}
      </>
    </LayoutHOC>
  );
}

export default ExistingNewsEditor;
