export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = {
    type
  };
  argNames.forEach((item, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export const rootSelector = (rootName) => (state) => {
  return state[rootName];
};