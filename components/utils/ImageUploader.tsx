import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload,Image } from 'antd';
import React, { useEffect, useState } from 'react';

async function getBase64(img): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const INITIAL_IMAGE_STATE = {
  loading: false,
  url: '',
  file: undefined,
};

function ImageUploader({ setImage }) {
  const [imageUrl, setImageUrl] = useState(INITIAL_IMAGE_STATE);

  const uploadButton = (
    <div className=' w-60 sm:h-52 bg-gray-200 rounded-md flex flex-col justify-center items-center'>
      {imageUrl.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const props = {
    name: 'file',
    multiple: false,
    onChange: async (info) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        let getImageBase64 = await getBase64(info.file.originFileObj);
        setImageUrl({ loading: false, url: getImageBase64, file: info.file });
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: () => setImageUrl(INITIAL_IMAGE_STATE),
    maxCount: 1,
  };

  useEffect(() => {
    setImage(imageUrl.file);
  }, [imageUrl]);
  return (
    <Upload {...props}>
      {imageUrl.url ? (
        <Image
          src={imageUrl.url}
          preview={false}
          alt='avatar'
          width={500}
          height={250}
          className='rounded-md'
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}

export default ImageUploader;
