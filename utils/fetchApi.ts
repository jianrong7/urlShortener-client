import axios from "axios";
import { UrlResponse } from "../pages";

export const fetchApi = async (
  url: string,
  payload: { origUrl: string; urlId?: string }
): Promise<UrlResponse> => {
  try {
    const response = await axios.post(url, payload);
    return response;
    // console.log(response);
    // setUrlResponse(response.data);
  } catch (err) {
    console.log(err);
    // return err;
  }
};
