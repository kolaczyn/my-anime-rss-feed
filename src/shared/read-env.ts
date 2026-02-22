import type { EnvVariable as EnvVar } from './types';

export const readEnv = (name: EnvVar): string => {
  const value = process.env[name];
  if (value == null) {
    throw new Error(`env variable not defined (${name})`);
  }
  return value;
};
