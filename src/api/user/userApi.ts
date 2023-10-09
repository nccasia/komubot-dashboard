import { apiAxios, userLink, userEditLink, userDeactiveLink } from "../../axios/apiAxios";
import { GetUser, PostEditUser } from "../../interface/interface";

export const getUser = async (index: GetUser, setLoading: (isLoading: boolean) => void) => {
  try {
    setLoading(true);
    let page, size, email, deactive, roles, sort, server_deactive;
    page = index.page;
    size = index.size;
    roles =index.roles;
    sort = index.sort;
    deactive=index.deactive;
    server_deactive = index.server_deactive;
    if (index?.name) {
        email = index.name;
    }
    const res: any = await apiAxios.post(userLink, { page, size, email, deactive, roles, sort, server_deactive });
    setLoading(false);
    return res.data;
  } catch (error) {
    setLoading(false);
  }
};

export const patchUser = async (userId: string | null) => {
  try {
    const res: any = await apiAxios.patch(userLink + `/${userId}`);
    return res.data;
  } catch (error) {
    
  }
};

export const postEditUser = async (index: PostEditUser) => {
  try {
    await apiAxios.post(userEditLink , index);
    return true;
  } catch (error) {
    return false;
  }
};

export const postDeactiveUser = async (userId: string | null) => {
  try {
    await apiAxios.post(userDeactiveLink , {userId});
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteDeactiveUser = async (userId: string | null) => {
  try {
    const queryParams = `/${userId}`
    await apiAxios.delete(userLink + queryParams);
    return true;
  } catch (error) {
    return false;
  }
};
