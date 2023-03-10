import {apiAxios, userLink} from '../../axios/apiAxios';
import { Iuser } from '../../interface/interface';

export interface PacthUser{
    index:string,
    data:Iuser[],
}
export const patchUser= async (main:PacthUser) => {
    try {
        const res = await apiAxios.patch(userLink+"/"+main.index, main.data);
        console.log(res);
        return res.data;
    } catch (error) {
            console.error(error);
        return [];
    }
};