import "./styles.css";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { heatmapConfig, heatmapPlugins } from "./heatmap-config.ts";
import { fetchData, fetchHeatmapSource } from "./api.ts";
import {
  howManyEpisodesInLastSevenDays,
  updateLastUpdatedEl,
  updateLastWatched,
  updateProgressBar,
} from "./update-dom.ts";
import type { HeatmapSource } from "./types.ts";

const makeHeatmap = (heatmapSource: HeatmapSource) => {
  const cal = new CalHeatmap();

  cal.paint(heatmapConfig(heatmapSource), heatmapPlugins);

  document
    .querySelector<HTMLButtonElement>("#heatmap-previous")!
    .addEventListener("click", () => cal.previous());
  document
    .querySelector<HTMLButtonElement>("#heatmap-next")!
    .addEventListener("click", () => cal.next());
};

const main = async () => {
  const [dto, heatmapSource] = await Promise.all([
    fetchData(),
    fetchHeatmapSource(),
  ]);

  updateLastWatched(dto);
  updateLastUpdatedEl(dto);
  updateProgressBar(dto);
  howManyEpisodesInLastSevenDays(dto);

  makeHeatmap(heatmapSource);
};
main();
