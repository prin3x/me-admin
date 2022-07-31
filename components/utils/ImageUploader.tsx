import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Image } from "antd";
import React, { useEffect, useState } from "react";

async function getBase64(img): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export interface IImageURL {
  loading?: boolean;
  url: string;
  file?: any;
}

export const INITIAL_IMAGE_STATE = {
  loading: false,
  url: "",
  file: undefined,
};

function ImageUploader({ setImage, currentImageUrl }) {
  const [imageUrl, setImageUrl] = useState<IImageURL>(INITIAL_IMAGE_STATE);
  const [progress, setProgress] = useState(0);

  const uploadButton = (
    <div className=" w-full d-block sm:h-52 bg-gray-200 rounded-md flex flex-col justify-center items-center">
      {imageUrl?.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;
    try {
      let getImageBase64 = await getBase64(file);
      setImageUrl({ loading: false, url: getImageBase64, file: file });
      setImage({ file: file });
      onSuccess('Ok');
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const props = {
    name: "file",
    multiple: false,
    onChange: async (info) => {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: () => {
      setImageUrl(INITIAL_IMAGE_STATE);
      setImage({ file: "" });
    },
    customRequest: uploadImage,
    maxCount: 1,
  };

  useEffect(() => {
    if (currentImageUrl) {
      setImageUrl({ url: currentImageUrl, loading: false, file: null });
    }
  }, [currentImageUrl]);

  return (
    <Upload {...props}>
      {imageUrl?.url ? (
        <Image
          src={imageUrl.url}
          preview={false}
          alt="avatar"
          width={250}
          height={250}
          className="rounded-md"
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}

export default ImageUploader;
