import {
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Row,
  Select,
} from "antd";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  IPostStruct,
  ListQueryPost,
  POST_STATUS,
} from "../../services/post/post.model";
import { ALL_RECENT_NEWS } from "../../services/post/post.queryKey";
import {
  _deletePost,
  _getRecentNews,
  _toggleStatus,
} from "../../services/post/post.service";
import * as queryString from "query-string";
import PostTable from "./PostTable";

interface Props {}

function RecentNewsPostList({}: Props): ReactElement {
  const queryClient = useQueryClient();
  const [queryStr, setQueryStr] = useState<ListQueryPost>({
    page: 1,
    orderBy: "updatedDate",
    categoryName: "",
  });
  const parseQuery = () => queryString.stringify(queryStr);
  const [isLoadingSwitch, setIsloadingSwitch] = useState(false);

  async function toggleCarouselStatus(id: string, status: POST_STATUS) {
    try {
      await _toggleStatus(id, status);
      setIsloadingSwitch(true);
      await queryClient.invalidateQueries([ALL_RECENT_NEWS]);
    } catch (error) {
      message.error(error.response.message);
    } finally {
      setIsloadingSwitch(false);
    }
  }

  const onSearchCategory = (_category: string) => {
    const currentQuery = queryStr;
    const categoryName = _category === 'all' ? '' : _category;
    setQueryStr({ ...currentQuery, categoryName });
  };

  const { data, isLoading, isSuccess } = useQuery<IPostStruct>(
    [ALL_RECENT_NEWS, queryStr],
    () => _getRecentNews(parseQuery())
  );

  function onChangeSearch(e) {
    e.preventDefault();
    const querySet = {
      ...queryStr,
      search: e.target.value,
      page: 1,
    };

    setQueryStr(querySet);
  }

  function onChangePage(_page) {
    const querySet = {
      ...queryStr,
      page: _page,
    };

    setQueryStr(querySet);
  }

  async function deletePost(_id: string) {
    let res;
    try {
      res = await _deletePost(_id);

      queryClient.invalidateQueries([ALL_RECENT_NEWS]);
    } catch (e) {
      console.error(e);
    }
  }

  async function togglePostStatus(id: string, status: POST_STATUS) {
    try {
      await _toggleStatus(id, status);
      queryClient.invalidateQueries([ALL_RECENT_NEWS]);
    } catch (error) {
      message.error(error.response.message);
    }
  }

  return (
    <div className="">
      <Row className="h-40 items-center" justify="start">
        <Col span={6} offset={1}>
          <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
            Posts
          </div>
        </Col>
        <Col span={8}>
          <Input
            onChange={onChangeSearch}
            placeholder="SEARCH"
            className="ml-auto text-right search-text-right"
            prefix={
              <SearchOutlined
                style={{
                  color: "#D8D8D8",
                }}
              />
            }
          />
        </Col>
        <Col span={4} offset={1}>
          <Select className="w-full" placeholder="All" onChange={onSearchCategory}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="announcement">Announcement</Select.Option>
            <Select.Option value="itclinic">IT Clinic</Select.Option>
            <Select.Option value="activity">Activity</Select.Option>
          </Select>
        </Col>
        <Col span={2} offset={1}>
          <Link href={`/news-editor/make`} passHref>
            <Button type="primary">ADD</Button>
          </Link>
        </Col>
      </Row>
      <div className="bg-slate-50 h-full p-4">
        <div className="bg-white p-2 rounded-md -mt-14 shadow-md	">
          <PostTable
            postData={data?.items || []}
            isLoading={isLoading}
            toggleStatus={togglePostStatus}
            isLoadingSwitch={isLoadingSwitch}
            onRemove={deletePost}
            page={data?.page}
            total={data?.total || 0}
            onChangePage={onChangePage}
          />
        </div>
      </div>
    </div>
  );
}

export default RecentNewsPostList;
