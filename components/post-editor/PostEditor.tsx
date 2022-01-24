import { ExclamationCircleOutlined } from '@ant-design/icons';
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
} from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { queryClient } from '../../pages/_app';
import { EDITOR_BODY, EDITOR_TYPE } from '../../services/post/post.model';
import {
  ALL_RECENT_NEWS,
  NEWS_CATEGORIES,
} from '../../services/post/post.queryKey';
import {
  _makeNewsContent,
  _getAllNewsCategories,
  _getRecentNews,
  _updatePost,
} from '../../services/post/post.service';
import ImageUploader from '../utils/ImageUploader';

interface Props {}

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const INITIAL_STATE = {
  categoryId: 0,
  content: '',
  title: '',
  type: EDITOR_TYPE.MAKE,
};

function PostEditor(props): ReactElement {
  const [form] = Form.useForm();
  const { initialContent, slug } = props;
  const { data, isLoading, isSuccess } = useQuery(
    NEWS_CATEGORIES,
    _getAllNewsCategories
  );
  const [richContentMeta, setRichContentMeta] =
    useState<EDITOR_BODY>(INITIAL_STATE);
  const [mainImage, setMainImage] = useState('');

  function setContentValue(_content) {
    setRichContentMeta({
      ...richContentMeta,
      content: _content,
    });
  }

  function resetContent() {
    setRichContentMeta({
      ...richContentMeta,
      content: '',
      categoryId: 0,
    });
  }

  function onChangeCategory(_value) {
    setRichContentMeta({
      ...richContentMeta,
      categoryId: _value,
    });
  }

  async function confirmMakeOrUpdatePost() {
    Modal.confirm({
      title: 'Do you want to create these items?',
      icon: <ExclamationCircleOutlined />,
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: async () => {
        try {
          let set = {
            ...richContentMeta,
            mainImage,
          };
          if (richContentMeta.type === EDITOR_TYPE.MAKE) {
            console.log(set.mainImage,'asdasd');
            await _makeNewsContent(set);
          } else {
            await _updatePost(slug, richContentMeta);
          }
          setRichContentMeta(INITIAL_STATE);
          message.success('Done');
          queryClient.invalidateQueries([ALL_RECENT_NEWS]);
        } catch (e) {
          message.error('Failed');
        }
      },
      onCancel() {},
    });
  }

  function onChangeTitle(e) {
    e.preventDefault();
    setRichContentMeta({
      ...richContentMeta,
      title: e.target.value,
    });
  }

  useEffect(() => {
    if (slug) {
      form.setFieldsValue({
        categoryId: initialContent.categoryId || data?.[0]?.id,
        title: initialContent.title,
      });
      setRichContentMeta({
        title: initialContent.title,
        categoryId: initialContent.categoryId,
        content: initialContent.content,
        type: EDITOR_TYPE.EDIT,
      });
    }
  }, [initialContent]);

  useEffect(() => {
    if (initialContent) return;
    if (isSuccess && !form.getFieldValue('categoryId')) {
      form.setFieldsValue({ categoryId: data?.[0]?.id });
      setRichContentMeta({
        ...richContentMeta,
        categoryId: data?.[0]?.id,
        type: EDITOR_TYPE.MAKE,
      });
    }
  }, [isSuccess]);

  return (
    <div className='p-10 px-10 mx-auto'>
      <Row justify='start'>
        <Col lg={24}>
          {isSuccess && (
            <Form form={form}>
              <Row justify='center'>
                <Col>
                  <Form.Item
                    name='title'
                    rules={[{ required: true }]}
                    label='Title'
                  >
                    <Input onChange={onChangeTitle} placeholder='ชื่อเรื่อง' />
                  </Form.Item>
                </Col>

                <Col>
                  <Form.Item name='categoryId' rules={[{ required: true }]}>
                    <Select
                      className='w-full'
                      disabled={isLoading}
                      onChange={onChangeCategory}
                    >
                      {data.map((_category) => (
                        <Select.Option key={_category.id} value={_category.id}>
                          {_category?.title}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify='center'>
                <Col>
                  <ImageUploader setImage={setMainImage} />
                </Col>
              </Row>
              <Row justify='center' className='mt-10'>
                <Col lg={18} md={18} className='bg-white'>
                  <Form.Item>
                    <ReactQuill
                      modules={modules}
                      formats={formats}
                      onChange={setContentValue}
                      value={richContentMeta.content}
                      style={{ height: '15rem' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
          <Row justify='center' className='flex gap-5 mt-20'>
            <Col className=''>
              <Button onClick={resetContent} className=''>
                Reset
              </Button>
            </Col>
            <Col className=''>
              <Button
                onClick={confirmMakeOrUpdatePost}
                className=''
                type='primary'
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default PostEditor;
