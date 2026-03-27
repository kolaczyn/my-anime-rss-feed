import { formatDate, prettyDate } from "./date-utils.ts";
import { episodesPlural } from "./plurals.ts";
import type { JsonFeedV2 } from "./types.ts";
import { calcRounded } from "./utils.ts";

export const updateLastWatched = ({
  lastWatchedEpisode: { wikiUrl, episodeNumber, title },
  buildDate,
}: JsonFeedV2) => {
  const lastWatchedEl = document.querySelector("#last-watched")!;
  const watchedDate = new Date(buildDate);
  lastWatchedEl.innerHTML = `Ostatnio obejrzałem odcinek <a href="${wikiUrl}">#${episodeNumber} "${title}"</a> ${formatDate(watchedDate)} (${prettyDate(watchedDate)})`;
};

export const updateLastUpdatedEl = (response: JsonFeedV2) => {
  document.querySelector("#last-updated")!.textContent =
    `Ostatnia aktualizacja: ${formatDate(new Date(response.buildDate))}`;
};

export const updateProgressBar = ({ totalWatched }: JsonFeedV2) => {
  const progressEl = document.querySelector<HTMLProgressElement>(
    "#progress-shippuuden",
  )!;
  progressEl.setAttribute("value", totalWatched.shippuden.toString());

  const percentEl = document.querySelector("#percent")!;
  const lastEpNum = totalWatched.shippuden;

  percentEl.textContent = calcRounded(lastEpNum, 500);

  document.querySelector("#percent-all")!.textContent = calcRounded(
    220 + Number(lastEpNum),
    220 + 500,
  );

  const wrapper = document.querySelector<HTMLDivElement>("#progress-wrapper")!;
  wrapper.style.display = "block";
};

export const howManyEpisodesInLastSevenDays = ({
  totalWatched: { lastSevenDays },
}: JsonFeedV2) => {
  document.querySelector("#in-last-week")!.textContent =
    `${lastSevenDays} ${episodesPlural(lastSevenDays)}`;
};
