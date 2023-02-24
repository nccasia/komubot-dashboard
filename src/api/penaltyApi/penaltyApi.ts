import { apiAxios, penaltyLink,amountLink } from "../../axios/apiAxios";
import {GetPenalty} from "../../interface/interface";
import { notyf } from "../../utils/notif"

export const getPenalty = async (index:GetPenalty,setLoading: (isLoading: boolean) => void) => {
    try {
        // let queryParams = "";
        //if(index.amountStart && index.amountEnd){
            setLoading(true); 
            let queryParams = `?&page=${index.page}&size=${index.size}`;
            //&amountStart=${index.amountStart}&amountEnd=${index.amountEnd}
            if (index.to && index.from) {
                queryParams += `&from=${index.from}&to=${index.to}`;
            }
            if(index.username){
                queryParams +=`&username=${index.username}`;
            }
            const res:any = await apiAxios.get(penaltyLink+queryParams);
            setLoading(false);
            return res.data;
        //}  
    } catch (error) {
        notyf.error(String(error));
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