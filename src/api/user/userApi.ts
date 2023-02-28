import { apiAxios, userLink } from "../../axios/apiAxios";
import { GetChannel } from "../../interface/interface";

export const getUser = async (index: GetChannel) => {
  try {
    let page, size, email,deactive;
    page = index.page;
    size = index.size;
    deactive=index.deactive;
    if (index?.name) {
        email = index.name;
    }
    
    const res: any = await apiAxios.post(userLink, { page, size, email,deactive });
    return res.data;
  } catch (error) {
    //return [];
  }
};
