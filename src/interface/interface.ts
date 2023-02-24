
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
    task:string,
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
  name?:string,
  deactive?: boolean | null,
}

  // message 
export interface Imessage{
  id: string,
  email: string,
  channelFullName: string,
  createdTimestamp: string,
  content: string,  
}

 export interface Iuser{
  
  avatar: string,
  userId: string,
  username: string,
  email: string,
  roles: Array<string>|null,
  roles_discord: Array<string>|null,
  deactive: boolean,

}
//Penalty
export interface Ipenalty{
  userId: string,
  username: string,
  // ammount: string,
  reason: string,
  isReject: boolean,
  channelFullName: string,
  createdTimestamp: string,

}
export interface GetPenalty{
  page:number,
  size:number,
  username:string,
  to:number,
  from:number,
  // amountStart:number,
  // amountEnd:number,
}
export interface Amount{
  max:string,
  min:string,
}
