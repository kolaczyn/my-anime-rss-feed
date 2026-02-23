import { polishPlurals } from './plurals.js';
import { prettyDate, formatDate } from './date-utils.js';

export const updateLastWatched = (response, episodeTitle) => {
  const lastWatchedEpisode = response.items[0];

  const wikiUrl = `https://naruto.fandom.com/wiki/${episodeTitle.replaceAll(' ', '_')}`;
  const lastWatchedEl = document.querySelector('#last-watched');
  const watchedDate = new Date(lastWatchedEpisode.pubDate);
  lastWatchedEl.innerHTML = `Ostatnio obejrzałem odcinek <a href="${wikiUrl}">#${lastWatchedEpisode.title} "${episodeTitle}"</a> ${formatDate(watchedDate)} (${prettyDate(watchedDate)})`;
};

export const updateLastUpdatedEl = (response) => {
  const lastUpdatedEl = document.querySelector('#last-updated');
  lastUpdatedEl.textContent = `Ostatnia aktualizacja: ${formatDate(new Date(response.lastBuildDate))}`;
};

export const updateProgressBar = (response) => {
  const lastWatchedEpisode = response.items[0];
  const progressEl = document.querySelector('#progress');
  progressEl.setAttribute('value', lastWatchedEpisode.title);

  const percentEl = document.querySelector('#percent');
  const lastEpNum = lastWatchedEpisode.title;
  const theProgress = (Number(lastEpNum) / 500) * 100;
  const rounded = (Math.round(theProgress * 100) / 100).toFixed(1);
  percentEl.textContent = `${rounded}%`;

  const wrapper = document.querySelector('#progress-wrapper');
  wrapper.style.display = 'block';
};

export const howManyEpisodesInLastSevenDays = (response) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const episodesInLastSevenDays = response.items.filter(
    (x) => new Date(x.pubDate) - sevenDaysAgo > 0,
  );
  document.querySelector('#in-last-week').textContent =
    `${episodesInLastSevenDays.length} ${polishPlurals('odcinek', 'odcinki', 'odcinków', episodesInLastSevenDays.length)}`;
};
