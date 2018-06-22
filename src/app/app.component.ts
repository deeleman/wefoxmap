import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SETTINGS } from '@wefox/settings';
import { PlatformState, PostState, selectPostsState } from '@wefox/platform';
import * as PostActions from '@wefox/platform/post';

@Component({
  selector: 'wfx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = SETTINGS.appName;
  postState: Observable<PostState>;

  constructor(private store: Store<PlatformState>) { }

  ngOnInit(): void {
    this.postState = this.store.select(selectPostsState);
    this.store.dispatch(new PostActions.Fetch());
  }
}
