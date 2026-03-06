import * as cheerio from 'cheerio';
import type { EpisodeWatchedDate } from '../../shared/types.ts';

const extractTextFromHtml = (html: string): string[] => {
  const $ = cheerio.load(html);

  const text = $('.spaceit_pad')
    .map((_, el) => $(el).text())
    .get();

  const cleanedUp = text.map((x) => x.replaceAll('\n', '').trim());
  return cleanedUp;
};

const watchedRegex =
  /Ep (\d*), watched on (\d*)\/(\d*)\/(\d*) at (\d*):(\d*) Remove/;

const extractInfoFromText = (text: string): EpisodeWatchedDate => {
  console.log(watchedRegex.exec(text));
  const [_full, episodeNum, month, day, year, hour, minute] =
    watchedRegex.exec(text)!;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
  );

  return {
    episode: Number(episodeNum),
    date,
  };
};

export const extractWatchedDates = (html: string): EpisodeWatchedDate[] => {
  const episodesText = extractTextFromHtml(html);

  return episodesText.map((text) => extractInfoFromText(text));
};
