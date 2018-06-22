import { environment } from '@wefox/../environments/environment';

export const SETTINGS = {
  // INHERITED ENVIRONMENT SETTINGS
  ...environment,

  // APP GLOBAL SETTINGS
  appName: 'Wefox Office Locator',

  // API CONFIG
  api: {
    host: 'https://wf-challenge-artuan.herokuapp.com',
    postsEndpoint: '/posts'
  },

  // REDUX CONFIG
  maxStoreLoggingEntries: 50,

  // GOOGLE KEYS
  google: {
    mapKey: 'AIzaSyDpmJn73wSpasCRbW2ojDqzBtbyCwM_iCI'
  }
};
