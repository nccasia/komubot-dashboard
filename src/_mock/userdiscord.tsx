import { faker } from '@faker-js/faker';
import axios from 'axios';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const usersApi = async () => {
  try{
   const a:any=axios.get('http://10.10.20.18:3001/user', {
      
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.error(error);
     });
    return a;
     }
  catch{

  }
};



//export default usersApi;
