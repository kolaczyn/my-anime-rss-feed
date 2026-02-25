import type { JsonFeed } from "./types.ts";

const fetchData = async (): Promise<JsonFeed> => {
  const feedUrl = `https://w6d9sazgkqmr96r5.public.blob.vercel-storage.com/feed/naruto.json?random=${Math.random()}`;
  const response = await fetch(feedUrl);
  return await response.json();
};

const fetchEpisodeTitle = async (episodeNumber: string) => {
  const narutoShippuudenId = 1735;
  const apiUrl = `https://api.jikan.moe/v4/anime/${narutoShippuudenId}/episodes/${episodeNumber}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json.data.title;
};

const prettyDate = (date: Date) =>
  new Intl.DateTimeFormat("pl").format(new Date(date));

// taken from https://github.com/typeofweb/polish-plurals/blob/master/index.mjs
const polishPlurals = (
  singularNominativ: string,
  pluralNominativ: string,
  pluralGenitive: string,
  value: number,
) => {
  value = Math.abs(value);
  if (value === 1) {
    return singularNominativ;
  } else if (
    value % 10 >= 2 &&
    value % 10 <= 4 &&
    (value % 100 < 10 || value % 100 >= 20)
  ) {
    return pluralNominativ;
  } else {
    return pluralGenitive;
  }
};

/**
 * Taken From https://stackoverflow.com/a/78704662
 * Adapted from https://stackoverflow.com/a/67374710/
 */
const formatDate = (createTime: Date) => {
  const millisecondsPerSecond = 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const daysPerWeek = 7;
  const intervals = {
    week:
      millisecondsPerSecond *
      secondsPerMinute *
      minutesPerHour *
      hoursPerDay *
      daysPerWeek,
    day:
      millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay,
    hour: millisecondsPerSecond * secondsPerMinute * minutesPerHour,
    minute: millisecondsPerSecond * secondsPerMinute,
    second: millisecondsPerSecond,
  };
  const relativeDateFormat = new Intl.RelativeTimeFormat("pl", {
    style: "long",
  });

  const diff = createTime - new Date();
  for (const interval in intervals) {
    if (intervals[interval] <= Math.abs(diff)) {
      return relativeDateFormat.format(
        Math.trunc(diff / intervals[interval]),
        interval,
      );
    }
  }
  return relativeDateFormat.format(diff / 1000, "second");
};

const updateLastWatched = (response: JsonFeed, episodeTitle: string) => {
  const lastWatchedEpisode = response.items[0];

  const wikiUrl = `https://naruto.fandom.com/wiki/${episodeTitle.replaceAll(" ", "_")}`;
  const lastWatchedEl = document.querySelector("#last-watched")!;
  const watchedDate = new Date(lastWatchedEpisode.pubDate);
  lastWatchedEl.innerHTML = `Ostatnio obejrzałem odcinek <a href="${wikiUrl}">#${lastWatchedEpisode.title} "${episodeTitle}"</a> ${formatDate(watchedDate)} (${prettyDate(watchedDate)})`;
};

const updateLastUpdatedEl = (response: JsonFeed) => {
  const lastUpdatedEl = document.querySelector("#last-updated")!;
  lastUpdatedEl.textContent = `Ostatnia aktualizacja: ${formatDate(new Date(response.lastBuildDate))}`;
};

const updateProgressBar = (response: JsonFeed) => {
  const lastWatchedEpisode = response.items[0];
  const progressEl = document.querySelector<HTMLProgressElement>("#progress")!;
  progressEl.setAttribute("value", lastWatchedEpisode.title);

  const percentEl = document.querySelector("#percent")!;
  const lastEpNum = lastWatchedEpisode.title;
  const theProgress = (Number(lastEpNum) / 500) * 100;
  const rounded = (Math.round(theProgress * 100) / 100).toFixed(1);
  percentEl.textContent = `${rounded}%`;

  const wrapper = document.querySelector<HTMLDivElement>("#progress-wrapper")!;
  wrapper.style.display = "block";
};

const howManyEpisodesInLastSevenDays = (response: JsonFeed) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const episodesInLastSevenDays = response.items.filter(
    (x) => new Date(x.pubDate) - sevenDaysAgo > 0,
  );
  document.querySelector("#in-last-week")!.textContent =
    `${episodesInLastSevenDays.length} ${polishPlurals("odcinek", "odcinki", "odcinków", episodesInLastSevenDays.length)}`;
};

const makeHeatmap = (firstEpisode: Date) => {
  const dateFinishedNaruto = new Date("2025-07-15");
  const cal = new CalHeatmap();

  cal.paint(
    {
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
    },
    [
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
          text: () =>
            dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? "" : d)),
          padding: [25, 0, 0, 0],
        },
      ],
    ],
  );

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
