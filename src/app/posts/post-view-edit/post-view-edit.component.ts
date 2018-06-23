import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, combineLatest, filter } from 'rxjs/operators';

import { PlatformState, Post, selectPostsState } from '@wefox/platform';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'wfx-post-view-edit',
  templateUrl: './post-view-edit.component.html',
  styleUrls: ['./post-view-edit.component.scss']
})
export class PostViewEditComponent implements OnInit, OnDestroy {
  post: Post;
  private routeSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<PlatformState>
  ) { }

  ngOnInit() {
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

  private getPosts(): Observable<Post[]> {
    return this.store.select(selectPostsState).pipe(
      map(postState => postState.posts),
      filter(posts => Array.isArray(posts))
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
