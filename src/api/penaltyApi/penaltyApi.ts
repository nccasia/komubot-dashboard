import { apiAxios, penaltyLink,amountLink } from "../../axios/apiAxios";
import {GetPenalty} from "../../interface/interface";

export const getPenalty = async (index:GetPenalty) => {
    try {
        // let queryParams = "";
        //if(index.amountStart && index.amountEnd){
            let queryParams = `?&page=${index.page}&size=${index.size}`;
            //&amountStart=${index.amountStart}&amountEnd=${index.amountEnd}
            if (index.to && index.from) {
                queryParams += `&from=${index.from}&to=${index.to}`;
            }
            if(index.username){
                queryParams +=`&username=${index.username}`;
            }
            const res:any = await apiAxios.get(penaltyLink+queryParams);
            return res.data;
        //}
        
    } catch (error) {
        return [];
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