import {apiAxios, meetingLink} from '../../axios/apiAxios';
import {GetMeeting} from "../../interface/interface"

export const getMeeting= async (index:GetMeeting) => {
    try {   
        let queryParams = `?&page=${index.page}&size=${index.size}`;
        if (index.to && index.from) {
            queryParams += `&from=${index.from}&to=${index.to}`;
        }
        if(index.task){
            queryParams +=`&task=${index.task}`;
        }  
        const res = await apiAxios.get(meetingLink+queryParams);
        return res.data;
    } catch (error) {
            console.error(error);
        return [];
    }
};