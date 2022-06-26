import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
type Props = {
  textState: any;
  onChangeEditorState: (raw: EditorState) => void;
};

function DraftEditor({ textState, onChangeEditorState }: Props) {
  return (
    <div>
      <Editor
        editorState={textState.editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="border border-1 min-h-[10rem]"
        onEditorStateChange={onChangeEditorState}
      />
    </div>
  );
}

export default DraftEditor;
