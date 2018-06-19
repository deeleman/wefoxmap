import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { WindowRef } from '@ngx-starter/platform';
import { WebSocketService } from './websockets';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): Array<ModuleWithProviders> {
    return [{
      ngModule: CoreModule,
      providers: [
        { provide: WindowRef, useFactory: windowFactory },
        WebSocketService,
      ]
    }];
  }
}

export function windowFactory() {
  return {
    getNativeWindow: () => window
  };
}
