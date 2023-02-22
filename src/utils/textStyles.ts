
export const textStyle =(index:string)=>{ 
    index=index.replace(/_/g,'-').replace(/ /g,'-').replace(/[A-Z]/g, word => word.toLowerCase());     
    return index;
}