const localEnv = "LOCAL";
const testEnv = "TEST";
const prodEnv = "PROD";

const currentEnv = prodEnv;

const configurations = {
  [localEnv]: {
    base: "http://localhost",
    port: 8080,
    version: "/api/0.1",
  },
  [testEnv]: {
    base: "http://localhost",
    port: 8180,
    version: "/api/0.1",
  },
  [prodEnv]: {
    base: "http://localhost",
    port: 8080,
    version: "/api/0.1",
  }
};

const findCurrentConfig = () => {
  const config = configurations[currentEnv];
  if(!config) {
    throw new Error(`Could not find a valid network configuration for current env: ${currentEnv}
     and configurations ${JSON.stringify(configurations)}`);
  }
  return config;
};

export const networkConfig = findCurrentConfig();