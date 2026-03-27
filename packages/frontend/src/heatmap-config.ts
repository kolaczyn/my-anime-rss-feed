import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";
import LegendLite from "cal-heatmap/plugins/LegendLite";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import type { HeatmapSource } from "./types";

const dateFinishedNaruto = new Date("2025-07-15");

const getTomorrow = () => {
  const result = new Date();
  result.setDate(result.getDate() + 1);
  return result;
};

const getYearAgo = () => {
  const result = new Date();
  result.setFullYear(result.getFullYear() - 1);
  result.setMonth(result.getMonth() + 1);
  return result;
};

const isMobile = window.innerWidth < 1000;

export const heatmapConfig = (source: HeatmapSource) => ({
  data: {
    source,
    x: "date",
    y: (d) => {
      return +d["value"];
    },
    groupY: "max",
  },
  animationDuration: 125,
  date: {
    // date of finishing Naruto
    highlight: [dateFinishedNaruto],
    start: getYearAgo(),
    locale: "pl",
    // You can't scroll on mobile
    max: isMobile ? null : getTomorrow(),
  },
  range: 12,
  scale: {
    color: {
      type: "threshold",
      range: ["#4dd05a", "#37a446", "#166b34", "#14432a"],
      domain: [1, 3, 5],
    },
  },
  domain: {
    type: "month",
    gutter: 4,
    label: { text: "MMM", textAlign: "start", position: "top" },
  },
  subDomain: {
    type: "ghDay",
    radius: 2,
    width: 11,
    height: 11,
    gutter: 4,
  },
  itemSelector: "#ex-ghDay",
});

export const heatmapPlugins = [
  [
    Tooltip,
    {
      text: (date, value, dayjsDate) => {
        const additional =
          date === dateFinishedNaruto.getTime()
            ? ". Dzień skończenia oglądania Naruto"
            : "";
        return (
          (value ? value : "0") +
          " w " +
          dayjsDate.format("dddd, MMMM D, YYYY") +
          additional
        );
      },
    },
  ],
  [
    LegendLite,
    {
      includeBlank: true,
      itemSelector: "#ex-ghDay-legend",
      radius: 2,
      width: 11,
      height: 11,
      gutter: 4,
    },
  ],
  [
    CalendarLabel,
    {
      width: 30,
      textAlign: "start",
      // @ts-expect-error
      text: () => dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? "" : d)),
      padding: [25, 0, 0, 0],
    },
  ],
];
