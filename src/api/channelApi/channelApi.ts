import { apiAxios, channelLink } from "../../axios/apiAxios";
import {GetChannel} from "../../interface/interface";

export const getChannel = async (index:GetChannel) => {
    try {
        
        let queryParams = `?&page=${index.page}&size=${index.size}`;
        if(index.name){
            queryParams +=`&name=${index.name}`;
        }
        const res:any = await apiAxios.get(channelLink+queryParams);
        return res.data;
    } catch (error) {
        return [];
    }
};