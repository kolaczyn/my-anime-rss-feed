import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { heatmapConfig, heatmapPlugins } from "./heatmap-config.ts";
import { fetchData, fetchEpisodeTitle } from "./api.ts";
import {
  howManyEpisodesInLastSevenDays,
  updateLastUpdatedEl,
  updateLastWatched,
  updateProgressBar,
} from "./update-dom.ts";

const makeHeatmap = (firstEpisode: string) => {
  const cal = new CalHeatmap();

  cal.paint(heatmapConfig(firstEpisode), heatmapPlugins);

  document
    .querySelector<HTMLButtonElement>("#heatmap-previous")!
    .addEventListener("click", () => cal.previous());
  document
    .querySelector<HTMLButtonElement>("#heatmap-next")!
    .addEventListener("click", () => cal.next());
};

const main = async () => {
  const result = await fetchData();

  const lastWatchedEpisode = result.items[0];
  const firstWatchedEpisodeDate = result.items.at(-1)!.pubDate;
  const episodeTitle = await fetchEpisodeTitle(lastWatchedEpisode.title);

  updateLastWatched(result, episodeTitle);
  updateLastUpdatedEl(result);
  updateProgressBar(result);
  howManyEpisodesInLastSevenDays(result);

  makeHeatmap(firstWatchedEpisodeDate);
};
main();
