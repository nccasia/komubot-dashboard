import {apiAxios, mentionLink} from '../../axios/apiAxios';
import { PostMention } from "../../interface/interface";

export const getMention = async (index: PostMention, setLoading: (isLoading: boolean) => void) => {
    try {  
        setLoading(true); 
        let queryParams = `?&page=${index.page}&size=${index.size}`;
        if (index.to && index.from) {
            queryParams += `&from=${index.from}&to=${index.to}`;
        }
        if(index.name){
            queryParams +=`&name=${index.name}`;
        }  
        queryParams +=`&type=${index.type}`;
        const res = await apiAxios.get(mentionLink + queryParams);
        setLoading(false);
        return res.data;
    } catch (error:any) {
        setLoading(false);   
    }
};