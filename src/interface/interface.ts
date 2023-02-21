
//Login Page
export interface Author {
    username: string;
    password: string;
  }
//Channel Daily Page
export type dailystype = {
    channelid: string;
    daily: string;
    email: string;
    dailyContent: string;
    createdAt: string;
    id: number;
    userid: string;
    channelFullName:string;
  };

//Meeting Page
export interface DayTime{
  startDay:number,
  endDay:number,
}
export interface MeetingFace{
  id:number,
  createdTimestamp:string,
  task:string,
  repeat:string,
  cancel:boolean,
  repeatTime:string,
  channelFullName:string, 
}

//ChannelFace
export interface ChannelFace{
  id:string,
  name:string,
  type:string,
}

//dashBoard 
export interface Report
{
  totalUserActive: number,
  totalDailyOfToday: number,
  totalMsgOfToday: number,
  totalMeeting: number,
  totalChannel: number,
}
export interface reportMsgToday {
  totalMsgVinh: number;
  totalMsgHaNoi: number;
  totalMsgHaNoi2: number;
  totalMsgHaNoi3: number;
  totalMsgDaNang: number;
  totalMsgQuyNhon: number;
  totalMsgSaiGon: number;
  totalMsgSaiGon2: number;
}