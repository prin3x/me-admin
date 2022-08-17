import { Button, Col, Form, Input, Row } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { ICarousel } from "../../services/carousel/carousel.model";
import ImageUploader from "../utils/ImageUploader";

type Props = {
  onFinish: any;
  setImage;
  form;
  carouselData?: ICarousel;
  isEdit?: boolean;
};

function CarouselEditor({
  onFinish,
  setImage,
  form,
  carouselData,
  isEdit,
}: Props) {
  const router = useRouter();
  return (
    <div className="mt-10">
      <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl ml-10">
        Cover
      </div>
      <div className="bg-white p-5">
      <Row justify="center" align="bottom" className="mt-10">

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item wrapperCol={{span: 12}} rules={[{ required: true }]} label="Title" name="title">
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item wrapperCol={{span: 12}}  label="LinkOut" name="linkOut">
            <Input placeholder="Linkout" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="image">
            <ImageUploader
              width={1004}
              height={565}
              aspect={16/9}
              setImage={setImage}
              currentImageUrl={carouselData?.imageUrl || ""}
            />
          </Form.Item>
          <div className="lead text-lg text-center">
            Size (W x H) 1004 x 565 px
            <br />
            16 : 9
          </div>

          <Row justify="center" align="bottom" className="mt-10">
            <Form.Item>
              <Button
                type="ghost"
                onClick={() => router.push("/carousel")}
                className="mr-5"
              >
                Back
              </Button>
              <Button type="primary" htmlType="submit">
                {isEdit ? "Confirm" : "Create"}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Row>

      </div>
    </div>
  );
}

export default CarouselEditor;
