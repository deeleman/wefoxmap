import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, mergeMap, tap, combineLatest } from 'rxjs/operators';

import { PlatformState, Marker, Posts, Post, selectPostsState } from '@wefox/platform';
import { SETTINGS } from '@wefox/settings';

@Component({
  selector: 'wfx-posts-map',
  templateUrl: './posts-map.component.html',
  styleUrls: ['./posts-map.component.scss']
})
export class PostsMapComponent implements OnInit {
  posts$: Observable<Posts>;

  defaultMapConfig = SETTINGS.mapConfig;
  newMarker: Marker;

  constructor(
    private store: Store<PlatformState>,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.posts$ = this.store.select(selectPostsState).pipe(
      map(postState => postState.posts)
    );

    this.activatedRoute.queryParamMap
      .subscribe(paramMap => {
        const url = this.router.routerState.snapshot.url;
        if (url.includes('/new') || url.includes('/edit')) {
          this.toggleNewMarker({ lat: +paramMap.get('lat'), long: +paramMap.get('lng')});
        } else {
          this.toggleNewMarker(undefined);
        }
      });
  }

  onDoubleClick(event: { coords: { lat: number, lng: number } }): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: event.coords });
  }

  onMarkerClick(post: Post): void {
    this.router.navigate(['/view', post.id]);
  }

  private toggleNewMarker(coords?: { lat, long }): void {
    this.newMarker = coords;
  }
}
