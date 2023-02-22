type RowPage = {
    id: number;
    main: number[];
  };
export function rowPage(index:number):RowPage{
    if(index>10){
        if(index>50){
            if(index>100){
                return {id:10, main:[5,10,50,100,index]};
            }
            else{
                return {id:10, main:[5,10,50, index]};
            }
        }else{
            return {id:5, main:[5, 10, index]};
        }
    }else{
        return {id:index, main:[index]};
    }
}