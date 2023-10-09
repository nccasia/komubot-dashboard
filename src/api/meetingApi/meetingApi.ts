import {apiAxios, meetingLink} from '../../axios/apiAxios';
import {GetMeeting} from "../../interface/interface"

export const getMeeting= async (index:GetMeeting, setLoading: (isLoading: boolean) => void) => {
    try {   
        setLoading(true); 
        let queryParams = `?&page=${index.page}&size=${index.size}`;
        if (index.to && index.from) {
            queryParams += `&from=${index.from}&to=${index.to}`;
        }
        if(index.task){
            queryParams +=`&task=${index.task}`;
        }  
        if(index.sort){
            queryParams +=`&sort=${index.sort}`;
        }  
        const res = await apiAxios.get(meetingLink+queryParams);
        setLoading(false);
        return res.data;
    } catch (error:any) {
        setLoading(false);
    }
};