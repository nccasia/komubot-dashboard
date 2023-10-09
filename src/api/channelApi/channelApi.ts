import { 
    apiAxios, 
    channelLink, 
    channelMemberLink, 
    channelRemoteMemberLink, 
    channelSearchLink,
    channelAddMemberLink
} from "../../axios/apiAxios";
import {GetChannel, GetChannelMember, PostRemoteMemberChannel} from "../../interface/interface"

export const getChannel = async (index:GetChannel,setLoading: (isLoading: boolean) => void) => {
    try {
        setLoading(true); 
        let queryParams = `?&page=${index.page}&size=${index.size}`;
        if(index.name){
            queryParams +=`&name=${index.name}`;
        }
        if(index.type){
            queryParams +=`&type=${index.type}`;
        }
        if(index.sort){
            queryParams +=`&sort=${index.sort}`;
        }
        const res:any = await apiAxios.get(channelLink+queryParams);
        setLoading(false);
        return res.data;
    } catch (error:any) {
        setLoading(false);
    }
};

export const getChannelMember = async (index: GetChannelMember, setLoading: (e: boolean) => void) => {
    try {
        setLoading(true);
        let queryParams = `?&id=${index.id}`;
        if(index.searchId){
            queryParams +=`&searchId=${index.searchId}`;
        }
        const res:any = await apiAxios.get(channelMemberLink+queryParams);
        setLoading(false);
        return res.data;
    } catch (error:any) {
        
    }
};

export const postRemoteMemberChannel = async (index: PostRemoteMemberChannel) => {
    try {
        await apiAxios.post(channelRemoteMemberLink , index);
        return true;
    } catch (error:any) {
        
    }
};

export const getSearchMemberChannel = async (name: string, setLoading: (e: boolean) => void) => {
    try {
        setLoading(true);
        const res:any = await apiAxios.get(channelSearchLink+`?&name=${name}`);
        setLoading(false);
        return res.data;
    } catch (error:any) {
        setLoading(false);
    }
};

export const postAddMemberChannel = async (index: PostRemoteMemberChannel) => {
    try {
        await apiAxios.post(channelAddMemberLink , index);
        return true;
    } catch (error:any) {
        
    }
};