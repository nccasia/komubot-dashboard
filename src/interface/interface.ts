
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
export interface GetMeeting{
    page:number,
    size:number,
    to:number,
    from:number,
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

//Channel
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
  VINH: number;
  HANOI: number;
  HANOI2: number;
  HANOI3: number;
  DANANG: number;
  QUYNHON: number;
  SAIGON: number;
  SAIGON2: number;
}
export interface GetChannel{
  page:number,
  size:number,
  name:string,
}