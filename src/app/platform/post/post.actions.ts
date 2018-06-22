import { Action } from '@ngrx/store';

import { Post, Posts } from './post.models';

export const FETCH              = '[Posts] Fetch posts';
export const FETCH_COMPLETE     = '[Posts] Fetch posts successful';
export const FETCH_FAIL         = '[Posts] Fetch posts failed';

export const CREATE             = '[Posts] Create new post';
export const CREATE_FAIL        = '[Posts] Create new post error';

export const UPDATE             = '[Posts] Update post';
export const UPDATE_FAIL        = '[Posts] Update post error';

export const DELETE             = '[Posts] Delete post';
export const DELETE_COMPLETE    = '[Posts] Delete post successful';
export const DELETE_FAIL        = '[Posts] Delete post error';

export class Fetch implements Action {
  readonly type = FETCH;
}

export class FetchComplete implements Action {
  readonly type = FETCH_COMPLETE;

  constructor(public posts: Posts) { }
}

export class FetchFail implements Action {
  readonly type = FETCH_FAIL;
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public post: Partial<Post>) { }
}

export class CreateFail implements Action {
  readonly type = CREATE_FAIL;
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public post: Partial<Post>) { }
}

export class UpdateFail implements Action {
  readonly type = UPDATE_FAIL;
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public post: Post) { }
}

export class DeleteComplete implements Action {
  readonly type = DELETE_COMPLETE;

  constructor(public post: Post) { }
}

export class DeleteFail implements Action {
  readonly type = DELETE_FAIL;
}
