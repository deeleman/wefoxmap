import { SETTINGS } from './settings';

describe('App settings', () => {
  it('should define an application name', () => {
    expect(SETTINGS.appName).toBeDefined();
  });

  it('should inform of the compilation mode', () => {
    expect(SETTINGS.production).toBeDefined();
  });

  it('should inform of the api details', () => {
    expect(SETTINGS.api).toBeDefined();
  });

  it('should inform of the api host', () => {
    expect(SETTINGS.api.host).toBeDefined();
  });

  it('should inform of the api Posts endpoint', () => {
    expect(SETTINGS.api.postsEndpoint).toBeDefined();
  });

  it('should define the maximum amunt of redux actions logged by Dev Tools', () => {
    expect(SETTINGS.maxStoreLoggingEntries).toBeDefined();
    expect(SETTINGS.maxStoreLoggingEntries).toBeGreaterThanOrEqual(0);
  });

  it('should contain a google settings element', () => {
    expect(SETTINGS.google).toBeDefined();
  });

  it('should have a proper GMaps key configured', () => {
    expect(SETTINGS.google.mapKey).toBeDefined();
  });

  it('should define a set of custom page titles', () => {
    expect(SETTINGS.titles).toBeDefined();
  });

  it('should defien a custom title for the not found page', () => {
    expect(SETTINGS.titles.notFound).toBeDefined();
  });

});
