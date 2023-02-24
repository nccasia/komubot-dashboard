import {apiAxios, meetingLink} from '../../axios/apiAxios';
import {GetMeeting} from "../../interface/interface"
import { notyf } from "../../utils/notif"

export const getMeeting= async (index:GetMeeting,setLoading: (isLoading: boolean) => void) => {
    try {   
        setLoading(true); 
        let queryParams = `?&page=${index.page}&size=${index.size}`;
        if (index.to && index.from) {
            queryParams += `&from=${index.from}&to=${index.to}`;
        }
        if(index.task){
            queryParams +=`&task=${index.task}`;
        }  
        const res = await apiAxios.get(meetingLink+queryParams);
        setLoading(false);
        return res.data;
    } catch (error) {
        notyf.error(String(error));
        return [];
    }
};