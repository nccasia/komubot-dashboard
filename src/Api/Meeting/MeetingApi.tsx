import {apiAxios, meetingLink} from '../../axios/ApiAxios';
import {GetMeeting} from "../../interface/interface"

export const getMeeting= async (index:GetMeeting | null) => {
    try {
        let queryParams = "";
        if (index !==null){
            queryParams = "?";
            if(index.page && index.size){
                queryParams += `&page=${index.page}&size=${index.size}`;
            }
            if (index.to && index.from) {
                queryParams += `&from=${index.from}&to=${index.to}`;
            }
        }
        const res = await apiAxios.get(meetingLink+queryParams);
        return res.data.content;
    } catch (error) {
            console.error(error);
        return [];
    }
};