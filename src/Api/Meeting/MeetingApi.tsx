import {apiAxios, meetingLink} from '../../axios/ApiAxios';
import {DayTime} from "../../interface/interface"

export const getMeeting= async (index:DayTime | null) => {
    try {
        let queryParams = "";
        if (index && index.startDay && index.endDay) {
            queryParams = `?from=${index.startDay}&to=${index.endDay}`;
          }
        const res = await apiAxios.get(meetingLink+queryParams);
        return res.data.content;
    } catch (error) {
            console.error(error);
        return [];
    }
};