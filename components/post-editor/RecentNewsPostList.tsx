import { Button, Col, Image, List, Row } from 'antd';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ALL_RECENT_NEWS } from '../../services/post/post.queryKey';
import { _deletePost, _getRecentNews } from '../../services/post/post.service';

interface Props {}

function RecentNewsPostList({}: Props): ReactElement {
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess } = useQuery(
    [ALL_RECENT_NEWS],
    _getRecentNews
  );

  async function deletePost(_id: number) {
    let res;
    try {
      res = await _deletePost(_id);

      queryClient.invalidateQueries([ALL_RECENT_NEWS]);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className='mt-10'>
      <List
        className='p-5'
        loading={isLoading}
        dataSource={isSuccess ? data : []}
        renderItem={(_content: any) => (
          <List.Item key={_content.id}>
            <Row gutter={[0, 0]} className='w-full' align='middle'>
              <Col md={3}>
                <div className='thumnail'>
                  <Image src='https://ui-avatars.com/api/?rounded=false' />
                </div>
              </Col>
              <Col md={4}>
                <List.Item.Meta description={_content.title} />
              </Col>
              <Col md={5}>
                <List.Item.Meta description={_content.content} />
              </Col>
              <Col md={3}>
                <div>{_content.status}</div>
              </Col>
              <Col md={3}>
                {new Date(_content.updatedDate).toLocaleDateString()}
              </Col>
              <Col md={3}>
                <Link href={`/news-editor/${_content.slug}`} passHref>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => deletePost(_content.id)}>Delete</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default RecentNewsPostList;
