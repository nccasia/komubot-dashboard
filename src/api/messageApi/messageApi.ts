import { apiAxios, messageLink } from "../../axios/apiAxios";
import { FilterParamsMessage } from "../../interface/interface";

export const filterMessages = async (index: FilterParamsMessage, setIsLoading: any) => {
  try {
      setIsLoading(true);
      let queryParams = `?&page=${index.page}&size=${index.size}`;
      if (index.to && index.from) {
        queryParams += `&from=${index.from}&to=${index.to}`;
      }
      if(index.title){
        queryParams +=`&title=${index.title}`;
      }
      if(index.sort){
        queryParams +=`&sort=${index.sort}`;
      }
      const res:any = await apiAxios.get(messageLink+queryParams);
      setIsLoading(false);
      return res.data;
  } catch (error) {
    setIsLoading(false);
    return [];
  }
};
