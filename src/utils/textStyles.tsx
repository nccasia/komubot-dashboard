
export const textStyle =(index:string)=>{
    
        index=index.replaceAll(/_/g,'-').replaceAll(/ /g,'-').replaceAll(/[A-Z]/g, word => word.toLowerCase());     

    return(
        <p>{index}</p>
    )
}