import { apiAxios, dailyLink } from "../../axios/apiAxios";

export const getDailys = async () => {
  try {
    const res = await apiAxios.get(dailyLink);
    return res.data.content;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const filterDailys = async (
  startDay: number | null,
  endDay: number | null
) => {
  try {
    let queryParams = "";
    if (startDay && endDay) {
      queryParams = `?from=${startDay}&to=${endDay}`;
    }
    const res = await apiAxios.get(dailyLink + queryParams);
    return res.data.content;
  } catch (error) {
    console.error(error);
    return [];
  }
};
