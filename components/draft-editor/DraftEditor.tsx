import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
type Props = {
  textState: any;
  onChangeEditorState: (raw: EditorState) => void;
};

function DraftEditor({ textState, onChangeEditorState }: Props) {
  const embedVideoCallBack = (link) => {
    if (link.indexOf("youtube") >= 0) {
      link = link.replace("watch?v=", "embed/");
      link = link.replace("/watch/", "/embed/");
      link = link.replace("youtu.be/", "youtube.com/embed/");
    }
    return link;
  };
  return (
    <div>
      <Editor
        editorState={textState.editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="border border-1 min-h-[10rem]"
        onEditorStateChange={onChangeEditorState}
        toolbar={{
          fontFamily: {
            options: [],
            className: 'hidden',
            component: undefined,
            dropdownClassName: 'hidden',
          },
          embedded: {
            embedCallback: embedVideoCallBack,
          },
        }}
      />
    </div>
  );
}

export default DraftEditor;
