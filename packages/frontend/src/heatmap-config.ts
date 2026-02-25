const dateFinishedNaruto = new Date("2025-07-15");

export const heatmapConfig = (firstEpisode: Date) => ({
  data: {
    source: `https://w6d9sazgkqmr96r5.public.blob.vercel-storage.com/feed/naruto.tsv?random=${Math.random()}`,
    type: "tsv",
    x: "date",
    y: (d) => +d["watched"],
    groupY: "max",
  },
  date: {
    // date of finishing Naruto
    highlight: [dateFinishedNaruto],
    start: new Date(firstEpisode),
    locale: "pl",
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
      text: () => dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? "" : d)),
      padding: [25, 0, 0, 0],
    },
  ],
];
