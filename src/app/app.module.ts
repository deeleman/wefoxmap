import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { SETTINGS } from '@wefox/settings';
import { CoreModule } from '@wefox/core';
import { VendorModule } from '@wefox/vendor';
import { PlatformModule } from '@wefox/platform';
import { SharedModule } from '@wefox/shared';

import { PostsMapComponent } from '@wefox/posts';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    VendorModule.forRoot(),
    PlatformModule.forRoot(),
    SharedModule,
    AgmCoreModule.forRoot({ apiKey: SETTINGS.google.mapKey }),
  ],
  providers: [
    Title,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_INITIALIZER, multi: true, useFactory: onAppInit, deps: [Injector] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function onAppInit(injector: Injector) {
  return () => {
    // early initialization actions
  };
}
