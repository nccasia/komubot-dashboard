import { apiAxios, channelLink } from "../../axios/apiAxios";

export const getChannel = async () => {
    try {
        const res = await apiAxios.get(channelLink);
        return res.data.content;
    } catch (error) {
        console.error(error);
        return [];
    }
};