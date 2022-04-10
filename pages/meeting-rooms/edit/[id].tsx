import { Form, message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LayoutHOC from "../../../components/layouts/LayoutHOC";
import RoomEditor from "../../../components/room-booking/RoomEditor";
import { MEETINGROOMS_KEY } from "../../../services/meeting-rooms/meeting-room.model";
import {
  _getRoomById,
  _updateRoom,
} from "../../../services/meeting-rooms/meeting-rooms.service";

type Props = {};

function EditRooms({}: Props) {
  const router = useRouter();
  const [form] = Form.useForm();
  const roomData = useQuery([MEETINGROOMS_KEY, router.query.id], () =>
    _getRoomById(router.query.id as string)
  );

  const [image, setImage] = useState<any>("");
  const onFinish = async (_formValues) => {
    const set = { ..._formValues, id: router.query.id };
    set.image = image;

    try {
      await _updateRoom(set);
      router.push("/meeting-rooms");
    } catch (error) {
      message.error(error.response.message);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ image: image.file });
  }, [image]);

  useEffect(() => {
    if (roomData.isSuccess) {
      const { data } = roomData;
      form.setFieldsValue({
        image: data.imageUrl,
        name: data.name,
        description: data.description,
        floor: data.floor,
        capacity: data.capacity
      });
    }
  }, [roomData.isSuccess]);

  return (
    <LayoutHOC>
      <>
        <RoomEditor
          form={form}
          onFinish={onFinish}
          setImage={setImage}
          roomData={roomData.data}
          isEdit={true}
        />
      </>
    </LayoutHOC>
  );
}

export default EditRooms;
