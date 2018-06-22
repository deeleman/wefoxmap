import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostState } from './post.models';
import * as PostActions from './post.actions';

export const initialState: PostState = {
  posts: null,
  isLoading: true,
  hasErrors: false
};

export function postReducer(state = initialState, action: any): PostState {
  switch (action.type) {
    case PostActions.FETCH:
    case PostActions.CREATE:
    case PostActions.UPDATE:
    case PostActions.DELETE: {
      return {
        ...state,
        isLoading: true,
        hasErrors: false
      };
    }

    case PostActions.FETCH_FAIL:
    case PostActions.CREATE_FAIL:
    case PostActions.UPDATE_FAIL:
    case PostActions.DELETE_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasErrors: true
      };
    }

    case PostActions.FETCH_COMPLETE: {
      return {
        ...state,
        posts: (action as PostActions.FetchComplete).posts,
        isLoading: false,
        hasErrors: false
      };
    }

    case PostActions.DELETE_COMPLETE: {
      const deletedPost = (action as PostActions.DeleteComplete).post;
      return {
        ...state,
        posts: [...state.posts].filter(post => post.id !== deletedPost.id),
        isLoading: false,
        hasErrors: false
      };
    }

    default: {
      return state;
    }
  }
}

export const selectPostsState = createFeatureSelector<PostState>('postState');
