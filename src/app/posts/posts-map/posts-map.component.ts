import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlatformState, Posts, Post, selectPostsState } from '@wefox/platform';
import { SETTINGS } from '@wefox/settings';

@Component({
  selector: 'wfx-posts-map',
  templateUrl: './posts-map.component.html',
  styleUrls: ['./posts-map.component.scss']
})
export class PostsMapComponent implements OnInit {
  posts$: Observable<Posts>;

  defaultMapConfig = SETTINGS.mapConfig;

  constructor(
    private store: Store<PlatformState>,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.posts$ = this.store.select(selectPostsState).pipe(
      map(postState => postState.posts)
    );
  }

  onDoubleClick(event: { coords: { lat: number, lng: number } }): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: event.coords });
  }

  onMarkerClick(post: Post): void {
    this.router.navigate(['/view', post.id]);
  }
}
