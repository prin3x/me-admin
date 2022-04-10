import { Button, Col, Form, Input, message, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CarouselEditor from "../../../components/carousel/CarouselEditor";
import LayoutHOC from "../../../components/layouts/LayoutHOC";
import { _createCarousels } from "../../../services/carousel/carousel.service";

type Props = {};

function CarouselEditorPage({}: Props) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [image, setImage] = useState<any>("");
  const onFinish = async (_formValues) => {
    const set = { ..._formValues };
    set.image = image;
    try {
      await _createCarousels(set);
      router.push("/carousel");
    } catch (error) {
      console.error(error);
      message.error(error.response.message);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ image: image.file });
  }, [image]);

  return (
    <LayoutHOC>
      <>
        <CarouselEditor setImage={setImage} form={form} onFinish={onFinish} />
      </>
    </LayoutHOC>
  );
}

export default CarouselEditorPage;
