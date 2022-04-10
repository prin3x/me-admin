import { Form, message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CarouselEditor from "../../../components/carousel/CarouselEditor";
import LayoutHOC from "../../../components/layouts/LayoutHOC";
import { CAROUSEL_KEY } from "../../../services/carousel/carousel.model";
import {
  _getCarouselById,
  _updateCarousels,
} from "../../../services/carousel/carousel.service";

type Props = {};

function EditCarousel({}: Props) {
  const router = useRouter();
  const [form] = Form.useForm();
  const carouselData = useQuery([CAROUSEL_KEY, router.query.id], () =>
    _getCarouselById(router.query.id as string)
  );

  const [image, setImage] = useState<any>("");
  const onFinish = async (_formValues) => {
    const set = { ..._formValues, id: router.query.id };
    set.image = image;

    try {
      await _updateCarousels(set);
      router.push("/meeting-rooms");
    } catch (error) {
      message.error(error.response.message);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ image: image.file });
  }, [image]);

  useEffect(() => {
    if (carouselData.isSuccess) {
      const { data } = carouselData;
      form.setFieldsValue({
        image: data.imageUrl,
        linkOut: data.linkOut,
        title: data.title,
      });
    }
  }, [carouselData.isSuccess]);

  return (
    <LayoutHOC>
      <>
        <CarouselEditor
          carouselData={carouselData.data}
          onFinish={onFinish}
          setImage={setImage}
          isEdit={true}
          form={form}
        />
      </>
    </LayoutHOC>
  );
}

export default EditCarousel;
