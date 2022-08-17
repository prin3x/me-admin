import axios from "axios";
import { CAROUSEL_STATUS, ICarousel, ICarouselResponse } from "./carousel.model";

export async function _getAllCarousels(_queryStr): Promise<ICarouselResponse> {
  return await axios.get(`/carousel/all?${_queryStr}`).then((res) => res.data);
}

export async function _getCarouselById(_id: string): Promise<ICarousel> {
  return await axios.get(`/carousel/${_id}`).then((res) => res.data);
}

export async function _createCarousels(params): Promise<ICarousel[]> {
  let formData = new FormData();
  formData.append("title", params.title);
  formData.append("linkOut", params.linkOut);
  formData.append("image", params.image.file);

  const config = {
    url: `/carousel`,
    data: formData,
  };
  return axios.post(config.url, config.data).then((res) => res.data);
}

export async function _updateCarousels(params): Promise<ICarousel[]> {
  let formData = new FormData();
  formData.append("title", params.title);
  formData.append("linkOut", params.linkOut);
  formData.append("image", params.image.file || params.image);

  const config = {
    url: `/carousel/${params.id}`,
    data: formData,
  };
  return axios.patch(config.url, config.data).then((res) => res.data);
}

export async function _removeCarouselById(_id: string) {
  return await axios.delete(`/carousel/${_id}`);
}

export async function _patchCarouselStatus(
  _id: string,
  status: CAROUSEL_STATUS
) {
  return await axios.patch(`/carousel/${_id}/status`, { status });
}
