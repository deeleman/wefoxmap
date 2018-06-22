import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SETTINGS } from '@wefox/settings';
import { PlatformState, Posts, selectPostsState } from '@wefox/platform';

@Component({
  selector: 'wfx-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Posts>;

  constructor(private store: Store<PlatformState>, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(SETTINGS.appName);

    this.posts$ = this.store
      .select(selectPostsState)
      .pipe(
        map(postState => postState.posts)
      );
  }
}
