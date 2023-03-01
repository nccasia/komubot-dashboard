import { apiAxios, messageLink } from "../../axios/apiAxios";
type FilterParams = {
  page?: number;
  size?: number;
  email?: string;
  fromDay?:number;
  toDay?:number;
};
export const getMessages = async () => {
  try {
    const res = await apiAxios.get(messageLink);
    return res.data.content;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const filterMessages = async (filters?: FilterParams) => {
  try {
    let queryParams = "";
    if (filters) {
      const { page, size, email,fromDay,toDay } = filters;
      // console.log(fromDay,'s')
      if (page) queryParams += `&page=${page}`;
      if (size) queryParams += `&size=${size}`;
      if (email) queryParams += `&email=${email}`;
      if (fromDay && fromDay != 0) queryParams += `&from=${fromDay}`;
      if (toDay && fromDay != 0) queryParams += `&to=${toDay}`;
      if (queryParams) queryParams = `?${queryParams.substr(1)}`;
    }
    const res = await apiAxios.get(messageLink+queryParams);
    console.log(res.data.content);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
