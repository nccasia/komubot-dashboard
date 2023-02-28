type RowPage = {
    id: number;
    main: number[];
  };
export function rowPage(index:number):RowPage{
    if(index>10){
        if(index>50){
            if(index>100){
                if(index>500){
                    if(index>1000){
                        return {id:10, main:[5,100,500]};
                    }else{
                        return {id:10, main:[5,50,100]};
                    }
                }else{
                    return {id:10, main:[5,25,50]};
                }          
            }
            else{
                return {id:10, main:[5,10,25]};
            }
        }else{
            return {id:5, main:[5, 10, index]};
        }
    }else{
        return {id:index, main:[index]};
    }
}