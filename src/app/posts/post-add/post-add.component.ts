import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { delay, first } from 'rxjs/operators';

import { SETTINGS } from '@wefox/settings';
import { Post, PlatformState, PostState, selectPostsState } from '@wefox/platform';
import * as postActions from '@wefox/platform/post';

@Component({
  selector: 'wfx-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit, OnDestroy {
  postState$: Observable<PostState>;

  private dispatchSubscription: Subscription;

  constructor(private store: Store<PlatformState>, private router: Router, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`New post | ${SETTINGS.appName}`);
    this.postState$ = this.store.select(selectPostsState);
  }

  onSave(post: Post): void {
    this.store.dispatch(new postActions.Create(post));
    this.dispatchSubscription = this.postState$.pipe(
      delay(0),
      first(postState => postState.isLoading === false && !postState.hasErrors)
    ).subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy(): void {
    if (this.dispatchSubscription) {
      this.dispatchSubscription.unsubscribe();
    }
  }
}
