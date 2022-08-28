import { Button, Col, Form, Input, InputNumber, message, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import LayoutHOC from "../../../components/layouts/LayoutHOC";
import RoomEditor from "../../../components/room-booking/RoomEditor";
import { MEETINGROOMS_KEY } from "../../../services/meeting-rooms/meeting-room.model";
import { _createRoom } from "../../../services/meeting-rooms/meeting-rooms.service";

type Props = {};

function MakeRooms({}: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [form] = Form.useForm();
  const [image, setImage] = useState<any>("");

  const onFinish = async (_formValues) => {
    const set = { ..._formValues };
    set.image = image;

    try {
      await _createRoom(set);
      queryClient.invalidateQueries([MEETINGROOMS_KEY])
      router.push("/meeting-rooms");
    } catch (error) {
      message.error(error.response.message);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ image: image.file });
  }, [image]);

  return (
    <LayoutHOC>
       <RoomEditor form={form} onFinish={onFinish} setImage={setImage}/>
    </LayoutHOC>
  );
}

export default MakeRooms;
