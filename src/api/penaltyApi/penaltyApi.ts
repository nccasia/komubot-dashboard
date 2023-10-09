import { apiAxios, penaltyLink,amountLink } from "../../axios/apiAxios";
import {GetPenalty} from "../../interface/interface";
//import { notyf } from "../../utils/notif"

export const getPenalty = async (index:GetPenalty,setLoading: (isLoading: boolean) => void) => {
    try {
        setLoading(true); 
        let queryParams = `?&page=${index.page}&size=${index.size}`;
        if (index.to && index.from) {
            queryParams += `&from=${index.from}&to=${index.to}`;
        }
        if(index.username){
            queryParams +=`&username=${index.username}`;
        }
        if(index.sort){
            queryParams +=`&sort=${index.sort}`;
        }
        const res:any = await apiAxios.get(penaltyLink+queryParams);
        setLoading(false);
        return res.data;
    } catch (error:any) {
        setLoading(false);
    }
};

export const getAmount = async () => {
    try {
        const res:any = await apiAxios.get(amountLink);
        return res.data.content;
    } catch (error) {
        return [];
    }
};