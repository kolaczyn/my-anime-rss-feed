export const storageSuffix = import.meta.env.PROD
  ? ""
  : `?random=${Math.random()}`;
