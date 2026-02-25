// taken from https://github.com/typeofweb/polish-plurals/blob/master/index.mjs
export const polishPlurals = (
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

export const calcRounded = (current: number | string, total: number) => {
  const theProgress = (Number(current) / total) * 100;
  const rounded = (Math.round(theProgress * 100) / 100).toFixed(1);
  return `${rounded}%`;
};
