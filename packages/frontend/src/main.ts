import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { heatmapConfig, heatmapPlugins } from "./heatmap-config.ts";
import { fetchData } from "./api.ts";
import {
  howManyEpisodesInLastSevenDays,
  updateLastUpdatedEl,
  updateLastWatched,
  updateProgressBar,
} from "./update-dom.ts";

const makeHeatmap = () => {
  const cal = new CalHeatmap();

  cal.paint(heatmapConfig, heatmapPlugins);

  document
    .querySelector<HTMLButtonElement>("#heatmap-previous")!
    .addEventListener("click", () => cal.previous());
  document
    .querySelector<HTMLButtonElement>("#heatmap-next")!
    .addEventListener("click", () => cal.next());
};

const main = async () => {
  const result = await fetchData();

  const episodeTitle = result.items[0].episodeTitle;

  updateLastWatched(result, episodeTitle);
  updateLastUpdatedEl(result);
  updateProgressBar(result);
  howManyEpisodesInLastSevenDays(result);

  makeHeatmap();
};
main();
