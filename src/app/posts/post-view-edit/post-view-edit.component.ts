import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, combineLatest, filter, delay, first } from 'rxjs/operators';

import { PlatformState, Post, PostState, selectPostsState } from '@wefox/platform';
import * as postActions from '@wefox/platform/post';

@Component({
  selector: 'wfx-post-view-edit',
  templateUrl: './post-view-edit.component.html',
  styleUrls: ['./post-view-edit.component.scss']
})
export class PostViewEditComponent implements OnInit, OnDestroy {
  post: Post;
  postState$: Observable<PostState>;
  private routeSubscription: Subscription;
  private dispatchSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<PlatformState>,
  ) { }

  ngOnInit() {
    this.postState$ = this.store.select(selectPostsState);
    this.routeSubscription = this.route.parent.paramMap.pipe(
      map((params: ParamMap) => +params.get('id')),
      combineLatest(this.getPosts())
    ).subscribe(([id, posts]) => {
      this.post = posts.find(post => post.id === id);
      if (!this.post) {
        return this.router.navigate(['notFound'], { skipLocationChange: true });
      }
    });
  }

  onSave(post: Post): void {
    this.store.dispatch(new postActions.Update(post));
    this.dispatchSubscription = this.postState$.pipe(
      delay(0),
      first(postState => postState.isLoading === false && !postState.hasErrors)
    ).subscribe(() => this.router.navigate(['/view', post.id]));
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.dispatchSubscription) {
      this.dispatchSubscription.unsubscribe();
    }
  }

  private getPosts(): Observable<Post[]> {
    return this.store.select(selectPostsState).pipe(
      map(postState => postState.posts),
      filter(posts => Array.isArray(posts))
    );
  }
}
