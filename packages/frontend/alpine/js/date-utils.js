export const prettyDate = (date) =>
  new Intl.DateTimeFormat('pl').format(new Date(date));

export const dayDifference = (start, end) => {
  const timeDifference = end - start;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
};

/**
 * Taken From https://stackoverflow.com/a/78704662
 * Adapted from https://stackoverflow.com/a/67374710/
 */
export const formatDate = (createTime) => {
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
  const relativeDateFormat = new Intl.RelativeTimeFormat('pl', {
    style: 'long',
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
  return relativeDateFormat.format(diff / 1000, 'second');
};
