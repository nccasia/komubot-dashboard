
import dayjs from 'dayjs'
export const formatDateTime=(date:string)=>{

    return dayjs(new Date(Number(date))).format('h:mm A DD/MM/YYYY');
}
