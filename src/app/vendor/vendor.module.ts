import { NgModule, ModuleWithProviders, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleTagManagerService } from './google';

@NgModule({
  imports: [CommonModule]
})
export class VendorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: VendorModule,
      providers: [
        GoogleTagManagerService,
        { provide: APP_INITIALIZER, multi: true, useFactory: initializeVendorProviders, deps: [Injector] }
      ]
    };
  }
}

export function initializeVendorProviders(injector: Injector) {
  return () => {
    // const googleTagManagerService: GoogleTagManagerService = injector.get(GoogleTagManagerService);
    // googleTagManagerService.bootstrap(GTM_ID, GTM_EVENT_NAME);
  };
}
