import { Component } from '@angular/core';

import { appSettings } from './app.settings';
@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = appSettings.appName;
}
