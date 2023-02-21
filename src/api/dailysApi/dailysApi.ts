import { apiAxios, dailyLink } from "../../axios/apiAxios";
type FilterParams = {
  page?: number;
  size?: number;
  email?: string;
  startDay?:number;
  endDay?:number;
};
export const getDailys = async () => {
  try {
    const res = await apiAxios.get(dailyLink);
    return res.data.content;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const filterDailys = async (filters?: FilterParams) => {
  try {
    let queryParams = "";
    if (filters) {
      const { page, size, email,endDay,startDay } = filters;
      if (page) queryParams += `&page=${page}`;
      if (size) queryParams += `&size=${size}`;
      if (email) queryParams += `&email=${email}`;
      if (startDay) queryParams += `&from=${startDay}`;
      if (endDay) queryParams += `&to=${endDay}`;
      if (queryParams) queryParams = `?${queryParams.substr(1)}`;
    }
    const res = await apiAxios.get(dailyLink + queryParams);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
