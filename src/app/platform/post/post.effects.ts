import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { PostService } from './post.service';
import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {

  @Effect()
  fetchPosts$: Observable<Action> = this.actions$
    .ofType(PostActions.FETCH)
    .pipe(
      switchMap(() => this.postService.list()
        .pipe(
          map(posts => ({ type: PostActions.FETCH_COMPLETE, posts })),
          catchError(error => of({ type: PostActions.FETCH_FAIL }))
        )
      )
    );

  @Effect()
  createPost$: Observable<Action> = this.actions$
    .ofType<PostActions.Create>(PostActions.CREATE)
    .pipe(
      switchMap(action => this.postService.create(action.post)
        .pipe(
          map(() => ({ type: PostActions.FETCH })),
          catchError(error => of({ type: PostActions.CREATE_FAIL }))
        )
      )
    );

  @Effect()
  updatePost$: Observable<Action> = this.actions$
    .ofType<PostActions.Update>(PostActions.UPDATE)
    .pipe(
      switchMap(action => this.postService.update(action.post)
        .pipe(
          map(() => ({ type: PostActions.FETCH })),
          catchError(error => of({ type: PostActions.UPDATE_FAIL }))
        )
      )
    );

  @Effect()
  deletePost$: Observable<Action> = this.actions$
    .ofType<PostActions.Delete>(PostActions.DELETE)
    .pipe(
      switchMap(action => this.postService.remove(action.post)
        .pipe(
          map(post => ({ type: PostActions.DELETE_COMPLETE, post })),
          catchError(error => of({ type: PostActions.DELETE_FAIL }))
        )
      )
    );

  constructor(private actions$: Actions, private postService: PostService) {}
}
