import { apiAxios, channelLink } from "../../axios/ApiAxios";
import {GetChannel} from "../../interface/interface";

export const getChannel = async (index:GetChannel| null) => {
    try {
        let queryParams = "";
        if (index !==null){
            queryParams = "?";
            if(index.page && index.size){
                queryParams += `&page=${index.page}&size=${index.size}`;
            }
            if(index.name){
                queryParams +=`&name=${index.name}`;
            }
        }
        console.log(queryParams);
        const res = await apiAxios.get(channelLink+queryParams);
        return res.data.content;
    } catch (error) {
        return [];
    }
};