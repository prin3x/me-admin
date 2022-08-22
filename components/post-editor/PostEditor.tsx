import {
  CloseOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  StarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
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
  Upload,
} from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { queryClient } from "../../pages/_app";
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
import { API_URL } from "../../config";
import { getAuthToken } from "../../services/auth/auth.service";

const INITIAL_STATE = {
  categoryName: "announcement",
  content: "",
  title: "",
};

function PostEditor(props): ReactElement {
  const router = useRouter();
  const [form] = Form.useForm();
  const { initialContent, slug } = props;
  const [selectedCategory, setSelectedCategory] = useState("announcement");
  const [mainImage, setMainImage] = useState("");
  const [homeImage, setHomeImage] = useState("");
  const [tags, setTags] = useState([]);
  const [newTagValue, setNewTagValue] = useState("");
  const [textState, setTextState] = useState({
    editorState: EditorState.createEmpty(),
  });
  const [isSameImage, setIsSameImage] = useState(false);

  async function setTagOptions() {
    try {
      const tagResponse = await getTags();

      setTags(tagResponse);
    } catch (error) {
      message.error("Unable to load tags");
    }
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
      Modal.confirm({
        title: "Are you sure",
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          try {
            let set = {
              title: _form.title,
              categoryName: _form.categoryName,
              tag: _form.tag,
              description: _form.description,
              postBy: _form.postBy,
              content: JSON.stringify(
                convertToRaw(textState.editorState.getCurrentContent())
              ),
              mainImage,
              homeImage: isSameImage ? mainImage : homeImage,
              isSameImage: isSameImage,
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

  const onCheckSameImage = (e) => {
    setIsSameImage(e.target.checked);
  };

  // async function setCategoryName() {
  //   let res;

  //   try {
  //     res = await _getAllNewsCategories();
  //     setSelectedCategory(res);
  //     form.setFieldsValue({ categoryName: res?.[0]?.title });
  //   } catch (e) {
  //     message.error("Failed Cannot Get Category");
  //   }
  // }

  const onSelectCategory = (_value: string) => {
    setSelectedCategory(_value);
  };

  const onChangeEditorState = (_editorState: EditorState) => {
    setTextState({ editorState: _editorState });
  };

  useEffect(() => {
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
            <Form
              form={form}
              wrapperCol={{ span: 6 }}
              labelCol={{ span: 3 }}
              labelAlign="left"
            >
              <Form.Item
                name="categoryName"
                label="Category Name"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Category"
                  className="w-full"
                  style={{ width: 200 }}
                  onChange={onSelectCategory}
                >
                  <Select.Option value="announcement">
                    Announcement
                  </Select.Option>
                  <Select.Option value="itclinic">IT Clinic</Select.Option>
                  <Select.Option value="activity">Activity</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="title"
                rules={[{ required: true }]}
                label="Title"
              >
                <Input placeholder="ชื่อเรื่อง" width={200} />
              </Form.Item>
              <Form.Item name="tag" rules={[{ required: true }]} label="Tag">
                <Select
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space align="center" style={{ padding: "0 8px 4px" }}>
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
              <Form.Item
                name="description"
                rules={[{ required: true }]}
                wrapperCol={{ span: 12 }}
                label="Description"
                className="w-full"
              >
                <Input.TextArea
                  placeholder="description"
                  autoSize={{ minRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="postBy"
                rules={[{ required: true }]}
                label="Post By"
              >
                <Input placeholder="เขียนโดย" width={200} />
              </Form.Item>
              <Row justify="center">
                <Col span={9}>
                  <div className="text-3xl">Cover Image</div>
                  <ImageUploader
                    height={240}
                    aspect={1 / 1}
                    width={240}
                    setImage={setMainImage}
                    currentImageUrl={initialContent?.imageUrl || ""}
                  />
                  <div className="lead text-xl font-bold">
                    Size (W x H)
                    <br />
                    <p className="font-normal text-xl">146 x 146 px, 1 : 1</p>
                  </div>
                </Col>
                {!isSameImage && (
                  <Col span={10} offset={1}>
                    <div className="text-3xl">Home Image</div>
                    <ImageUploader
                      height={240}
                      width={353}
                      aspect={
                        selectedCategory === "announcement" ? 3 / 4 : 3 / 2
                      }
                      setImage={setHomeImage}
                      currentImageUrl={initialContent?.homeImageUrl || ""}
                    />
                    <div className="lead text-xl  font-bold">
                      Size (W x H)
                      <br />
                      <p className="font-normal text-xl mb-0">
                        <span className="min-w-[3rem]">Announcement</span>
                        <span>:240 x 353 px, 3:4</span>
                      </p>
                      <p className="font-normal text-xl">
                        <span className="min-w-[3rem]">
                          IT Clinic & Activities
                        </span>
                        <span>:495 x 333 px, 3:2</span>
                      </p>
                    </div>
                  </Col>
                )}
                <Col span={4}>
                  <Form.Item name="isSameImage">
                    <Checkbox
                      onChange={onCheckSameImage}
                      style={{ marginLeft: 24 }}
                    >
                      Same Image
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Upload
                listType="picture"
                action={`${API_URL}/upload/image`}
                method="POST"
                className="upload-list-inline"
                headers={{
                  authorization: `Bearer ${getAuthToken()}`,
                }}
                showUploadList={{
                  showDownloadIcon: true,
                  downloadIcon: (
                    <CopyOutlined className='hover:text-black focus:text-green-500'/>
                  ),
                  showRemoveIcon: true,
                }}
                onDownload={(file) => {
                  navigator.clipboard.writeText((file as any).response);
                  message.success("Copy File Url Successfully");
                }}
              >
                <Button icon={<UploadOutlined />}>Custom Upload Image</Button>
              </Upload>
              <Row justify="center" className="mt-10">
                <Col lg={24} md={24} className="bg-white">
                  <DraftEditor
                    textState={textState}
                    onChangeEditorState={onChangeEditorState}
                  />
                </Col>
              </Row>
            </Form>
            <Row justify="center" className="flex gap-5 mt-10">
              <Col className="">
                <Button
                  onClick={() => router.push("/news-editor")}
                  className=""
                >
                  Back
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
