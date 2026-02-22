import axios from 'axios';
import { malBearerToken } from './mal-bearer-token';

export const fetchWatchedDates = async (animeId: number) => {
  console.log('Fetching episodes data...');
  const apiUrl = `https://myanimelist.net/ajaxtb.php?keepThis=true&detailedaid=${animeId}`;

  const response = await axios.get(apiUrl, malBearerToken);

  console.log('Finished fetching episodes data.');
  return response.data;
};
