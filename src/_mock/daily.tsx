import axios from 'axios';

export const fetchData = async () => {
  try {
    const res = await axios.get(
      "http://10.10.20.18:3001/daily"
    );
  return res.data.content;
  } catch (error) {
    console.error(error);
    return [];
  }
};