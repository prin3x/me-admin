import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CloudOutlined, HighlightOutlined } from "@ant-design/icons";
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
            className: "hidden",
            component: undefined,
            dropdownClassName: "hidden",
          },
          embedded: {
            embedCallback: embedVideoCallBack,
          },
          colorPicker: {
            component: (props) => <ColorPic {...props} />,
          },
        }}
      />
    </div>
  );
}

export default DraftEditor;

function ColorPic({ expanded, onExpandEvent, onChange, currentState }) {
  const [currentColor, setCurrentColor] = useState<any>();
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const onChangeColor = (color) => {
    setCurrentColor(color);
  };



  useEffect(() => {
    if(expanded) return
    onChange("color", currentColor?.hex || '#000');

    // return () => onChange("color", currentState.color.hex);
  },[expanded])

  const renderModal = () => {
    return (
      <div onClick={stopPropagation} className="absolute">
        <SketchPicker
          color={currentColor}
          onChange={onChangeColor}
        />
      </div>
    );
  };

  return (
    <div
      aria-haspopup="true"
      aria-expanded={expanded}
      aria-label="rdw-color-picker"
      className="rdw-link-wrapper"
    >
      <div onClick={onExpandEvent} className="rdw-option-wrapper">
        <HighlightOutlined />
      </div>
      {expanded ? renderModal() : null}
    </div>
  );
}
