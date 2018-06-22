import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { CoreModule } from '@wefox/core';
import { VendorModule } from '@wefox/vendor';
import { PlatformModule } from '@wefox/platform';
import { SharedModule } from '@wefox/shared';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    VendorModule.forRoot(),
    PlatformModule.forRoot(),
    SharedModule,
  ],
  providers: [
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
