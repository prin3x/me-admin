import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { SketchPicker } from "react-color";
import { HighlightOutlined } from "@ant-design/icons";
import { throttle } from "lodash";
import { Button, Col, Row } from "antd";
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
        toolbarClassName="sticky top-0 z-50"
        wrapperClassName="wrapperClassName"
        editorClassName="home-editor rdw-editor-main border border-1 min-h-[30rem] h-[15rem] overflow-x-scroll"
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
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
          colorPicker: {
            component: (props) => (
              <ColorPic textState={textState.editorState} {...props} />
            ),
          },
        }}
      />
    </div>
  );
}

export default DraftEditor;

function ColorPic({ expanded, onExpandEvent, onChange, currentState }) {
  const [currentColor, setCurrentColor] = useState<any>({
    hex: "#000000",
    hsl: { h: 240, s: 1, l: 0, a: 1 },
    hsv: { h: 240, s: 1, v: 0, a: 1 },
    oldHue: 245,
    rgb: { r: 0, g: 0, b: 0, a: 1 },
    source: "hsv",
  });
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const onChangeColor = (color) => {
    setCurrentColor(color);
  };

  useEffect(() => {
    if (expanded) return;
    // onChange("color", currentColor?.hex || "#000");

    // return () => onChange("color", currentState.hex);
  }, [expanded]);

  const renderModal = () => {
    return (
      <div onClick={stopPropagation} className="absolute flex flex-col">
        <SketchPicker
          color={currentColor.rgb}
          onChange={throttle((color) => onChangeColor(color), 500)}
          disableAlpha
        />
        <Row justify="center">
          <Col>
            <Button
              style={{backgroundColor: 'black', color: '#fff'}}
              className="mt-3 shadow-2xl	"
              onClick={() => onChange("color", currentColor?.hex || "#000")}
            >
              Select As Color
            </Button>
          </Col>
          <Col>
            <Button
              className="mt-3 ml-3 shadow-2xl	"
              onClick={() => onChange("bgcolor", currentColor?.hex || "#fff")}
            >
            As BG Color
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div
      aria-haspopup="true"
      aria-expanded={expanded}
      aria-label="rdw-color-picker"
      className="rdw-link-wrapper z-50"
    >
      <div onClick={onExpandEvent} className="rdw-option-wrapper">
        <HighlightOutlined />
      </div>
      {expanded ? renderModal() : null}
    </div>
  );
}
