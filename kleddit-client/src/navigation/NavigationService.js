import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const navigate = path => {
  if (!path || typeof path !== 'string') {
    throw new Error(`Path needs to be a string, it was ${path}`);
  }
  history.push(path);
};

export const NavigationService = {

  register: () => {
    navigate('/register');
  },

  login: () => {
    navigate('/login');
  },

  profile: () => {
    navigate('/profile');
  },

  mainPage: () => {
    navigate('/');
  },

  refresh: () => {
    window.location.reload();
  }

};