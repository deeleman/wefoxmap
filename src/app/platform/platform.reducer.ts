import { ActionReducerMap } from '@ngrx/store';

import { PostState, postReducer } from './post';

export interface PlatformState {
  postState: PostState;
}

export const platformReducer: ActionReducerMap<PlatformState> = {
  postState: postReducer,
};
