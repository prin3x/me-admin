import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, message, Modal, Row, Select } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NEWS_CATEGORIES } from '../../services/news/news.queryKey';
import {
  _createFreshNewsContent,
  _getAllNewsCategories,
  _getRecentNews,
} from '../../services/news/news.service';

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
    handlers: {
      image: (res) => console.log(res, 'asdasd'),
    },
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

function RichEditor(props): ReactElement {
  const { initialContent } = props;
  const { data, isLoading, isSuccess } = useQuery(
    NEWS_CATEGORIES,
    _getAllNewsCategories
  );
  const [richContentMeta, setRichContentMeta] = useState({
    categoryId: 0,
    id: 0,
    content: '',
  });

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

  function _confirmCreateNewPost() {
    Modal.confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: async () => {
        try {
          await _createFreshNewsContent(richContentMeta);
          message.success('Done');
        } catch (e) {
          message.error('Failed');
        }
      },
      onCancel() {},
    });
  }

  async function getRecentNews() {
    const data = await _getRecentNews();
  }

  useEffect(() => {
    if (initialContent) {
      setRichContentMeta({
        ...richContentMeta,
        content: initialContent,
      });
    }
  }, []);

  return (
    <div className='p-10 px-10 mx-auto'>
      <Row justify='start'>
        <Col lg={24}>
          <Form>
            <Row>
              <Col offset={3}>
                <Form.Item>
                  <Select
                    className='w-full'
                    placeholder={'Category'}
                    disabled={isLoading}
                    onChange={onChangeCategory}
                  >
                    {isSuccess &&
                      data.map((_category) => (
                        <Select.Option key={_category.id} value={_category.id}>
                          {_category?.title}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
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
          <Row justify='center' className='flex gap-5 mt-20'>
            <Col className=''>
              <Button onClick={resetContent} className=''>
                Reset
              </Button>
            </Col>
            <Col className=''>
              <Button
                onClick={_confirmCreateNewPost}
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

export default RichEditor;
