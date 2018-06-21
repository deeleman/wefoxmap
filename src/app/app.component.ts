import { Component } from '@angular/core';

import { SETTINGS } from '@wefox/settings';
@Component({
  selector: 'wfx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = SETTINGS.appName;
}
