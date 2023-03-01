type RowPage = {
    id: number;
    main: number[];
  };
export function rowPage(index:number){

    if(index<100){
        return [5,10,25];
    }
    if(index>=100 &&index<1000){
        return [5,10,25,50,100];
    }
    if(index>=1000 &&index<10000){
        return [5,10,25,50,100,500];
    }
}


export function rowPageMessage(lengthData:number):number[]{
    if(lengthData<=50){
        return [5, 10, 20, 25, 30, 50]
    }
    if(lengthData<=100&&lengthData>50)
    return [5,Math.ceil(lengthData/6),Math.ceil(lengthData*2/6),Math.ceil(lengthData*3/6)]
    if(lengthData>100&&lengthData<=1000){
        return [5,Math.ceil(lengthData/10),Math.ceil(lengthData*4/10),Math.ceil(lengthData*5/10)]
    }
    return [5,100,400,lengthData-450]

    
}