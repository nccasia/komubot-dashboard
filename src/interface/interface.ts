
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
    userid?: string;
    userId?: string;
    channelFullName:string;
    avatar?: string;
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
    sort: string,
}

export interface PostMention{
  page?:number,
  size?:number,
  sort?:string,
  to?:number | null,
  from?:number | null,
  type?: boolean | string,
  name?: string,
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

//Mention
export interface MentionFace{
  id: number,
  author:string,
  mention: string,
  channel: string,
  type:string,
  time: number,
  reaction: number,
  confirm: boolean,
  punish: boolean,
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
  [x: string]: any;
  VINH: number;
  HANOI: number;
  HANOI2: number;
  HANOI3: number;
  DANANG: number;
  QUYNHON: number;
  SAIGON: number;
  SAIGON2: number;
}

export interface reportRoleType {
  name: string;
  total: number
}
export interface GetChannel{
  page:number,
  size:number,
  name?:string,
  deactive?: boolean | null,
  type?: string,
  sort?: string,
}

export interface GetChannelMember{
  id?: string;
  searchId?: string;
  threadId?: string;
}

export interface PostRemoteMemberChannel{
  channelId?: string;
  userId?: string;
}

export interface GetUser{
  page:number,
  size:number,
  name?:string,
  deactive?: boolean | null,
  roles: string[] | null,
  sort: string,
  server_deactive: boolean | null,
}

export interface PostEditUser{
  userId: string;
  username: string;
  email: string;
  roles: string[];
  roles_discord: string[];
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
  
  avatar: string | null,
  userId: string | null,
  username: string | null,
  email: string | null,
  roles: Array<string> |null,
  roles_discord: Array<string> |null,
  deactive: boolean,
  server_deactive: boolean | null,
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
  sort: string,
}
export interface Amount{
  max:string,
  min:string,
}

export type FilterParams = {
  page?: number;
  size?: number;
  email?: string;
  to?:number;
  from?:number;
  filter?: string;
  sort?: string;
};

export type FilterParamsMessage = {
  page?: number;
  size?: number;
  title?: string;
  from?:number;
  to?:number;
  sort: string,
};