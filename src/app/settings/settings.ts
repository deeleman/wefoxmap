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
  },

  // CUSTOM PAGE TITLES
  titles: {
    notFound: 'Page not found'
  },

  // MAP DEFAULT CONFIG
  mapConfig: {
    lat: 48.82106292677622,
    long: 10.87646484375,
    zoom: 5,
    customIcon: './../../assets/images/wefox-logo-marker.png'
  }
};
