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

  const btnPrev =
    document.querySelector<HTMLButtonElement>("#heatmap-previous")!;
  const btnNext = document.querySelector<HTMLButtonElement>("#heatmap-next")!;

  btnPrev.addEventListener("click", () => cal.previous());
  btnNext.addEventListener("click", () => cal.next());

  cal.on("maxDateReached", () => {
    btnNext.setAttribute("disabled", "true");
  });
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
