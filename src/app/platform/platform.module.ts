import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SETTINGS } from '@wefox/settings';
import { PlatformEffects } from './platform.effects';
import { platformReducer } from './platform.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot(platformReducer),
    EffectsModule.forRoot(PlatformEffects.rootEffects()),
    !SETTINGS.production ? StoreDevtoolsModule.instrument({ maxAge: SETTINGS.maxStoreLoggingEntries }) : [],
  ]
})
export class PlatformModule {
  constructor(@Optional() @SkipSelf() parentModule: PlatformModule) {
    if (parentModule) {
      throw new Error('PlatformModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): Array<ModuleWithProviders> {
    return [{
      ngModule: PlatformModule,
      providers: []
    }];
  }
}
