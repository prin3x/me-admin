import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { queryClient } from "../../pages/_app";
import { EDITOR_BODY, EDITOR_TYPE } from "../../services/post/post.model";
import {
  ALL_RECENT_NEWS,
  NEWS_CATEGORIES,
} from "../../services/post/post.queryKey";
import {
  _makeNewsContent,
  _getAllNewsCategories,
  _getRecentNews,
  _updatePost,
} from "../../services/post/post.service";
import ImageUploader from "../utils/ImageUploader";

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

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
  const [richContentMeta, setRichContentMeta] =
    useState<EDITOR_BODY>(INITIAL_STATE);
  const [mainImage, setMainImage] = useState("");

  function setContentValue(_content) {
    setRichContentMeta({
      ...richContentMeta,
      content: _content,
    });
  }

  function resetContent() {
    setMainImage("");
    setRichContentMeta({
      ...richContentMeta,
      content: "",
      categoryName: "",
    });
  }

  function onChangeCategory(_value) {
    setRichContentMeta({
      ...richContentMeta,
      categoryName: _value,
    });
  }

  async function confirmMakeOrUpdatePost() {
    form.validateFields().then((_form) => {
      Modal.confirm({
        title: "Are you sure",
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          try {
            let set = {
              ...richContentMeta,
              title: _form.title,
              categoryName: _form.categoryName,
              mainImage,
            };
            if (!slug) {
              await _makeNewsContent(set);
            } else {
              await _updatePost(slug, set);
            }
            router.push("/news-editor");
            setRichContentMeta(INITIAL_STATE);
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

  useEffect(() => {
    setCategoryName();
  }, []);

  useEffect(() => {
    if (slug && initialContent) {
      form.setFieldsValue({
        categoryName: initialContent.categoryName,
        title: initialContent.title,
      });
      setRichContentMeta({
        ...richContentMeta,
        categoryName: initialContent.categoryName,
        content: initialContent.content,
      });
    }
  }, [slug, initialContent]);

  useEffect(() => {
    console.log(richContentMeta, "richContentMeta");
  }, [richContentMeta]);

  return (
    <div className="mx-auto mt-10">
      <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl ml-10">
        New Post
      </div>
      <div className="bg-white p-5">
        <Row className="mt-10 w-full">
          <Col lg={24}>
            <Form form={form}>
              <Row justify="center">
                <Col span={10}>
                  <Form.Item
                    name="title"
                    rules={[{ required: true }]}
                    label="Title"
                  >
                    <Input placeholder="ชื่อเรื่อง" width={400} />
                  </Form.Item>
                </Col>

                <Col offset={1}>
                  <Form.Item
                    name="categoryName"
                    label="Category Name"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Select Category"
                      className="w-full"
                      onChange={onChangeCategory}
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
                    setImage={setMainImage}
                    currentImageUrl={initialContent?.imageUrl || ""}
                  />
                </Col>
              </Row>
              <Row justify="center" className="mt-10">
                <Col lg={18} md={18} className="bg-white">
                  <Form.Item>
                    <ReactQuill
                      modules={modules}
                      formats={formats}
                      onChange={setContentValue}
                      value={richContentMeta.content}
                      style={{ height: "15rem" }}
                    />
                  </Form.Item>
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
                <Button
                  onClick={confirmMakeOrUpdatePost}
                  className=""
                  type="primary"
                >
                  Confirm
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PostEditor;
