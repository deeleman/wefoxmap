import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, combineLatest, filter, delay, first } from 'rxjs/operators';

import { SETTINGS } from '@wefox/settings';
import { PlatformState, Post, PostState, selectPostsState } from '@wefox/platform';
import * as PostActions from '@wefox/platform/post';

@Component({
  selector: 'wfx-post-view-detail',
  templateUrl: './post-view-detail.component.html',
  styleUrls: ['./post-view-detail.component.scss']
})
export class PostViewDetailComponent implements OnInit, OnDestroy {
  postState$: Observable<PostState>;
  post: Post;

  private routeSubscription: Subscription;
  private deleteAttempt: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<PlatformState>,
    private title: Title
  ) { }

  ngOnInit() {
    this.postState$ = this.store.select(selectPostsState);
    this.routeSubscription = this.route.paramMap.pipe(
      map((params: ParamMap) => +params.get('id')),
      combineLatest(this.getPosts())
    ).subscribe(([id, posts]) => {
      this.post = posts.find(post => post.id === id);
      if (!this.post) {
        const redirectPath = this.deleteAttempt ? '/' : 'notFound';
        return this.router.navigate([redirectPath], { skipLocationChange: !this.deleteAttempt });
      }
      this.title.setTitle(`${this.post.title} | ${SETTINGS.appName}`);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  onDelete(post: Post): void {
    this.deleteAttempt = true;
    this.store.dispatch(new PostActions.Delete(post));
  }

  private getPosts(): Observable<Post[]> {
    return this.postState$.pipe(
      map(postState => postState.posts),
      filter(posts => Array.isArray(posts))
    );
  }
}
