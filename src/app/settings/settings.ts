import { environment } from './../../environments/environment';

export const SETTINGS = {
  // ENV settings
  ...environment,

  // APP GLOBAL SETTINGS
  appName: 'Wefox Map',

  // API CONFIG
  api: {
    host: 'https://wf-challenge-artuan.herokuapp.com',
    postsEndpoint: '/posts'
  },

  // REDUX CONFIG
  maxStoreLoggingEntries: 50
};
