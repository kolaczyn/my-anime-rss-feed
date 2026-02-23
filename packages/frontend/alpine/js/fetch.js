export const fetchData = async () => {
  const feedUrl = `https://w6d9sazgkqmr96r5.public.blob.vercel-storage.com/feed/naruto.json?random=${Math.random()}`;
  const response = await fetch(feedUrl);
  return await response.json();
};

export const fetchEpisodeTitle = async (episodeNumber) => {
  const narutoShippuudenId = 1735;
  const apiUrl = `https://api.jikan.moe/v4/anime/${narutoShippuudenId}/episodes/${episodeNumber}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json.data.title;
};
