import { faker } from '@faker-js/faker';
import axios from 'axios';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const usersApi = async () => {
  try {
    const res = await axios.post(
      "http://10.10.20.18:3001/user"
    );
  return res.data.content;
  } catch (error) {
    console.error(error);
    return [];
  }
};



//export default usersApi;
