import { apiAxios, dailyLink } from "../../axios/apiAxios";
import { FilterParams } from "../../interface/interface";

export const filterDailys = async (index: FilterParams, setLoading: (isLoading: boolean) => void) => {
  try {
    setLoading(true); 
    let queryParams = `?&page=${index.page}&size=${index.size}`;
    if (index.to && index.from) {
      queryParams += `&from=${index.from}&to=${index.to}`;
    }
    if(index.email){
      queryParams +=`&email=${index.email}`;
    }  
    if(index.filter){
      queryParams +=`&filter=${index.filter}`;
    } 
    if(index.sort){
      queryParams +=`&sort=${index.sort}`;
    }  
    const res = await apiAxios.get(dailyLink + queryParams);
    setLoading(false); 
    return res.data;
  } catch (error) {
    setLoading(false); 
    return [];
  }
};
