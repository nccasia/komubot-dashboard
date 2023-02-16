import { faker } from '@faker-js/faker';
import axios from 'axios';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const penaltyApi = async () => {
  try {
    const res = await axios.get(
      "http://10.10.20.18:3001/penalty"
    );
  return res.data.content;
  } catch (error) {
    console.error(error);
    return [];
  }
};



