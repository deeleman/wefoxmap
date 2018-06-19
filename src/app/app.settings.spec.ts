import { appSettings } from './app.settings';

describe('App settings', () => {
  it('should define an application name', () => {
    expect(appSettings.appName).toBeDefined();
  });

  it('should inform of the compilation mode', () => {
    expect(appSettings.production).toBeDefined();
  });
});
