import { malBearerToken } from './mal-bearer-token.ts';
import { axiosClient } from '../shared/axios-client.ts';

export const fetchWatchedDates = async (animeId: number) => {
  console.log(`Fetching episodes data for ${animeId}...`);
  const apiUrl = `https://myanimelist.net/ajaxtb.php?keepThis=true&detailedaid=${animeId}`;

  const response = await axiosClient.get(apiUrl, malBearerToken);

  console.log(`Finished fetching episodes data for ${animeId}.`);
  return response.data;
};
