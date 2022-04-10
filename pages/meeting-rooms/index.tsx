import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import LayoutHOC from "../../components/layouts/LayoutHOC";
import RoomList from "../../components/room-booking/RoomList";
import {
  MEETINGROOMS_KEY,
  ROOM_STATUS,
} from "../../services/meeting-rooms/meeting-room.model";
import {
  _getAllRoomsAvb,
  _removeRomById,
  _toggleRoomStatus,
} from "../../services/meeting-rooms/meeting-rooms.service";
import { _toggleStatus } from "../../services/post/post.service";
import Link from "next/link";
import * as queryString from "query-string";

type Props = {};

function MeetingRooms({}: Props) {
  const queryClient = useQueryClient();
  const [queryStr, setQueryStr] = useState({
    page: 1,
    orderBy: "updatedDate",
  });

  const parseQuery = () => queryString.stringify(queryStr);

  const meetingData = useQuery([MEETINGROOMS_KEY, queryStr], () =>
    _getAllRoomsAvb(parseQuery())
  );
  const [isLoadingSwitch, setIsLoadingSwitch] = useState<boolean>(false);

  function onChangeSearch(e) {
    e.preventDefault();
    const querySet = {
      ...queryStr,
      search: e.target.value,
      page: 1,
    };

    setQueryStr(querySet);
  }

  async function removeThisRoom(_id: string) {
    try {
      await _removeRomById(_id);
      queryClient.invalidateQueries([MEETINGROOMS_KEY]);
    } catch (e) {
      message.error(e.response.message);
    }
  }

  async function toggleStatus(id: string, status: ROOM_STATUS) {
    try {
      setIsLoadingSwitch(true);
      await _toggleRoomStatus(id, status);
      queryClient.invalidateQueries([MEETINGROOMS_KEY]);
    } catch (e) {
      message.error(e.response.message);
    } finally {
      setIsLoadingSwitch(false);
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
      <div className="carousel-list-page">
        <Row className="h-40 items-center" justify="start">
          <Col span={6} offset={1}>
            <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
              Rooms
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
            <Link href={`/meeting-rooms/make`} passHref>
              <Button type="primary">Add</Button>
            </Link>
          </Col>
        </Row>
        <div className="bg-slate-50 h-full p-4">
          <div className="bg-white p-2 rounded-md -mt-14 shadow-md	">
            <RoomList
              removeThisRoom={removeThisRoom}
              roomData={meetingData?.data?.items || []}
              isLoading={meetingData?.isLoading}
              toggleStatus={toggleStatus}
              isLoadingSwitch={isLoadingSwitch}
              page={meetingData?.data?.page}
              onChangePage={onChangePage}
              total={meetingData?.data?.total || 0}
            />
          </div>
        </div>
      </div>
    </LayoutHOC>
  );
}

export default MeetingRooms;
