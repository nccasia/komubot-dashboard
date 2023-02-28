import { apiAxios, channelLink } from "../../axios/apiAxios"
import {GetChannel} from "../../interface/interface"
import { notyf } from "../../utils/notif"

export const getChannel = async (index:GetChannel,setLoading: (isLoading: boolean) => void) => {
    try {
        setLoading(true); 
        let queryParams = `?&page=${index.page}&size=${index.size}`;
        if(index.name){
            queryParams +=`&name=${index.name}`;
        }
        const res:any = await apiAxios.get(channelLink+queryParams);
        setLoading(false);
        return res.data;
    } catch (error:any) {
        notyf.error(String(error.message));
        setLoading(false);
    }
};