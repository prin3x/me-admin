import {
  CloseOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { queryClient } from "../../pages/_app";
import { EDITOR_BODY } from "../../services/post/post.model";
import { ALL_RECENT_NEWS } from "../../services/post/post.queryKey";
import {
  _makeNewsContent,
  _getAllNewsCategories,
  _getRecentNews,
  _updatePost,
} from "../../services/post/post.service";
import {
  createTags,
  getTags,
  removeTags,
} from "../../services/tags/tags.service";
import ImageUploader from "../utils/ImageUploader";
import DraftEditor from "../draft-editor/DraftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

const INITIAL_STATE = {
  categoryName: "announcement",
  content: "",
  title: "",
};

function PostEditor(props): ReactElement {
  const router = useRouter();
  const [form] = Form.useForm();
  const { initialContent, slug } = props;
  const [allCategories, setAllCategories] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [homeImage, setHomeImage] = useState("");
  const [tags, setTags] = useState([]);
  const [newTagValue, setNewTagValue] = useState("");
  const [textState, setTextState] = useState({
    editorState: EditorState.createEmpty(),
  });

  async function setTagOptions() {
    try {
      const tagResponse = await getTags();

      setTags(tagResponse);
    } catch (error) {
      message.error("Unable to load tags");
    }
  }

  function resetContent() {
    form.resetFields();
    setTextState({ editorState: EditorState.createEmpty() });
  }

  async function addNewTag(newItem: string) {
    try {
      await createTags({ tag: newItem });
      await setTagOptions();
    } catch (error) {
      console.error(error);
    } finally {
      setNewTagValue("");
    }
  }

  async function removeItem(id: number) {
    try {
      await removeTags(id);
      await setTagOptions();
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmMakeOrUpdatePost() {
    form.validateFields().then((_form) => {
      console.log(_form, "_form");
      Modal.confirm({
        title: "Are you sure",
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          try {
            let set = {
              title: _form.title,
              categoryName: _form.categoryName,
              tag: _form.tag,
              postBy: _form.postBy,
              content: JSON.stringify(
                convertToRaw(textState.editorState.getCurrentContent())
              ),
              mainImage,
              homeImage,
            };
            if (!slug) {
              await _makeNewsContent(set);
            } else {
              await _updatePost(slug, set);
            }
            router.push("/news-editor");
            message.success("Done");
            queryClient.invalidateQueries([ALL_RECENT_NEWS]);
          } catch (e) {
            message.error("Failed");
          }
        },
        onCancel() {},
      });
    });
  }

  async function setCategoryName() {
    let res;

    try {
      res = await _getAllNewsCategories();
      setAllCategories(res);
      form.setFieldsValue({ categoryName: res?.[0]?.title });
    } catch (e) {
      message.error("Failed Cannot Get Category");
    }
  }

  const onChangeEditorState = (_editorState: EditorState) => {
    setTextState({ editorState: _editorState });
  };

  useEffect(() => {
    setCategoryName();
    setTagOptions();
  }, []);

  useEffect(() => {
    if (slug && initialContent) {
      form.setFieldsValue({ ...initialContent });
      const editorState = convertFromRaw(JSON.parse(initialContent.content));
      setTextState({ editorState: EditorState.createWithContent(editorState) });
    }
  }, [slug, initialContent]);

  return (
    <div className="mx-auto mt-10">
      <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl ml-10">
        New Post
      </div>
      <div className="bg-white p-5">
        <Row className="mt-10 w-full" justify="center">
          <Col lg={20}>
            <Form form={form}>
              <Row justify="start">
                <Col span={10} offset={3}>
                  <Form.Item
                    name="title"
                    rules={[{ required: true }]}
                    label="Title"
                  >
                    <Input placeholder="ชื่อเรื่อง" width={200} />
                  </Form.Item>
                </Col>

                <Col span={10} offset={1}>
                  <Form.Item
                    name="categoryName"
                    label="Category Name"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Select Category"
                      className="w-full"
                      style={{ width: 200 }}
                    >
                      {allCategories.map((_category) => (
                        <Select.Option
                          key={_category.title}
                          value={_category.title}
                        >
                          {_category?.title}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="start">
                <Col span={6} offset={3}>
                  <Form.Item
                    name="tag"
                    rules={[{ required: true }]}
                    label="Tag"
                  >
                    <Select
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: "8px 0" }} />
                          <Space
                            align="center"
                            style={{ padding: "0 8px 4px" }}
                          >
                            <Input
                              placeholder="Please enter item"
                              onChange={(e) => setNewTagValue(e.target.value)}
                              value={newTagValue}
                            />
                            <Typography.Link
                              style={{ whiteSpace: "nowrap" }}
                              onClick={() => addNewTag(newTagValue)}
                            >
                              <PlusOutlined /> Add item
                            </Typography.Link>
                          </Space>
                        </>
                      )}
                    >
                      {tags.length > 0 &&
                        tags.map((tag) => (
                          <Select.Option key={tag.id} value={tag.tag}>
                            <div className="flex justify-between">
                              <span>{tag.tag}</span>
                              <span className="z-30">
                                <CloseOutlined
                                  className="delete--contact-options"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(tag.id);
                                  }}
                                />
                              </span>
                            </div>
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4} offset={5}>
                  <Form.Item
                    name="postBy"
                    rules={[{ required: true }]}
                    label="Post By"
                  >
                    <Input placeholder="เขียนโดย" width={200} />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={8}>
                  <div className="text-3xl">Cover Image</div>
                  <ImageUploader
                    setImage={setMainImage}
                    currentImageUrl={initialContent?.imageUrl || ""}
                  />
                </Col>
                <Col span={8} offset={1}>
                  <div className="text-3xl">Home Image</div>
                  <ImageUploader
                    setImage={setHomeImage}
                    currentImageUrl={initialContent?.homeImageUrl || ""}
                  />
                </Col>
              </Row>
              <Row justify="center" className="mt-10">
                <Col lg={18} md={18} className="bg-white">
                  <DraftEditor
                    textState={textState}
                    onChangeEditorState={onChangeEditorState}
                  />
                </Col>
              </Row>
            </Form>
            <Row justify="center" className="flex gap-5 mt-20">
              <Col className="">
                <Button onClick={resetContent} className="">
                  Reset
                </Button>
              </Col>
              <Col className="">
                <Popconfirm
                  title="Please make sure you want to publish this article"
                  onConfirm={confirmMakeOrUpdatePost}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className="" type="primary">
                    Confirm
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PostEditor;
