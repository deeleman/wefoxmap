import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  postState: Observable<PostState>;

  constructor(private store: Store<PlatformState>, private title: Title) { }

  ngOnInit(): void {
    this.postState = this.store.select(selectPostsState);
    this.store.dispatch(new PostActions.Fetch());

    this.title.setTitle(SETTINGS.appName);
  }
}
