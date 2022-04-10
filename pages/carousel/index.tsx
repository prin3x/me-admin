import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import LayoutHOC from "../../components/layouts/LayoutHOC";
import { DEFAULT_CAROUSEL } from "../../services/carousel/carousel.queryKey";
import {
  _getAllCarousels,
  _patchCarouselStatus,
  _removeCarouselById,
} from "../../services/carousel/carousel.service";
import { ListQueryParams } from "../../services/contact/contact.model";
import * as queryString from "query-string";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Row } from "antd";
import moment from "moment";
import { CAROUSEL_STATUS } from "../../services/carousel/carousel.model";
import Link from "next/link";
import CarouselList from "../../components/carousel/CarouselList";

type Props = {};

function CarouselPage({}: Props) {
  const queryClient = useQueryClient();
  const [queryStr, setQueryStr] = useState<ListQueryParams>({ page: 1 });
  const [isLoadingSwitch, setIsloadingSwitch] = useState(false);

  const parseQuery = () => queryString.stringify(queryStr);

  const carouselFetcher = useQuery([DEFAULT_CAROUSEL, queryStr], () =>
    _getAllCarousels(parseQuery())
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

  async function removeCarouselById(_id: string) {
    try {
      await _removeCarouselById(_id);
    } catch (e) {
      message.error("Error");
    }
  }

  async function toggleCarouselStatus(id: string, status: CAROUSEL_STATUS) {
    try {
      setIsloadingSwitch(true);
      await _patchCarouselStatus(id, status);
      await queryClient.invalidateQueries([DEFAULT_CAROUSEL]);
    } catch (error) {
      message.error(error.response.message);
    } finally {
      setIsloadingSwitch(false);
    }
  }

  function onChangePage(_page) {
    const querySet = {
      ...queryStr,
      page: _page,
    };

    setQueryStr(querySet);
  }

  return (
    <LayoutHOC>
      <div className="">
        <Row className="h-40 items-center" justify="start">
          <Col span={6} offset={1}>
            <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
              Carousel
            </div>
          </Col>
          <Col span={12}>
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
          <Col span={2} offset={1}>
            <Link href={`/carousel/make`} passHref>
              <Button type="primary">Add</Button>
            </Link>
          </Col>
        </Row>
        <div className="bg-slate-50 h-full p-4">
          <div className="bg-white p-2 rounded-md -mt-14 shadow-md	">
            <CarouselList
              carouselData={carouselFetcher?.data?.items || []}
              isLoading={carouselFetcher.isLoading}
              onRemove={removeCarouselById}
              toggleStatus={toggleCarouselStatus}
              isLoadingSwitch={isLoadingSwitch}
              page={carouselFetcher?.data?.page || 1}
              total={carouselFetcher?.data?.total || 0}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      </div>
    </LayoutHOC>
  );
}

export default CarouselPage;
