import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SETTINGS } from '@wefox/settings';
import { PlatformState, selectPostsState } from '@wefox/platform';
import * as PostActions from '@wefox/platform/post';

@Component({
  selector: 'wfx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<PlatformState>) { }

  ngOnInit(): void {
    this.store.dispatch(new PostActions.Fetch());
  }
}
