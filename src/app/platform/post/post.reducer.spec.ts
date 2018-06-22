import { Post, Posts } from './post.models';
import { postReducer, initialState } from './post.reducer';
import * as PostActions from './post.actions';

describe('PostReducer', () => {
  const mockPost = {
    id: 2,
    title: 'Barcelona',
    content: 'Barcelona is blah blah blah',
    created_at: '2018-06-13T20:24:44.145Z',
    updated_at: '2018-06-13T20:24:44.145Z',
    lat: 41.3851,
    long: 2.1734,
    image_url: 'https://fakeurl'
  };

  describe('undefined actions', () => {
    it('should return the default state', () => {
      const action = {};
      const state = postReducer(undefined, action);

      expect(state).toBe(initialState);
    });

    it('should return a null posts dataset upon bootstraping the store', () => {
      const action = {};
      const state = postReducer(undefined, action);

      expect(state.posts).toBeNull();
    });
  });

  describe('fetch actions', () => {
    it('should set the state on sync mode when items are fetched', () => {
      const action = { type: PostActions.FETCH };
      const state = postReducer(undefined, action);

      expect(state.hasErrors).toBeFalsy();
      expect(state.isLoading).toBeTruthy();
    });

    it('should reset sync mode and flag state as flawed when error occurs', () => {
      const action = { type: PostActions.FETCH_FAIL };
      const state = postReducer(undefined, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.hasErrors).toBeTruthy();
    });

    it('should leave the posts array as null after a failed fetch upon bootstrapping the app', () => {
      const action = { type: PostActions.FETCH_FAIL };
      const state = postReducer(undefined, action);

      expect(state.posts).toBeNull();
    });

    it('should feature post data and reset sync and error flags after successful fetch', () => {
      const action = { type: PostActions.FETCH_COMPLETE, posts: [mockPost] };
      const state = postReducer(undefined, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.hasErrors).toBeFalsy();
      expect(state.posts).toBeDefined();
      expect(state.posts.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('create actions', () => {
    it('should set the state on sync mode when creation is requested', () => {
      const action = { type: PostActions.CREATE };
      const state = postReducer(initialState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.hasErrors).toBeFalsy();
    });

    it('should reset sync mode and flag state as flawed when error occurs', () => {
      const action = { type: PostActions.CREATE_FAIL };
      const state = postReducer(initialState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.hasErrors).toBeTruthy();
    });
  });

  describe('update actions', () => {
    it('should set the state on sync mode when update is requested', () => {
      const action = { type: PostActions.UPDATE };
      const state = postReducer({
        posts: [mockPost],
        isLoading: true,
        hasErrors: false
      }, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.hasErrors).toBeFalsy();
      expect(state.posts.length).toBeGreaterThanOrEqual(0);
    });

    it('should reset sync mode and flag state as flawed when error occurs', () => {
      const action = { type: PostActions.UPDATE_FAIL };
      const state = postReducer({
        posts: [mockPost],
        isLoading: true,
        hasErrors: false
      }, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.hasErrors).toBeTruthy();
      expect(state.posts.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('delete actions', () => {
    it('should set the state on sync mode when delete is requested', () => {
      const action = { type: PostActions.DELETE };
      const state = postReducer({
        posts: [mockPost],
        isLoading: true,
        hasErrors: false
      }, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.hasErrors).toBeFalsy();
      expect(state.posts.length).toBeGreaterThanOrEqual(0);
    });

    it('should reset sync mode and flag state as flawed when error occurs', () => {
      const action = { type: PostActions.DELETE_FAIL };
      const state = postReducer({
        posts: [mockPost],
        isLoading: true,
        hasErrors: false
      }, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.hasErrors).toBeTruthy();
      expect(state.posts.length).toBeGreaterThanOrEqual(0);
    });

    it('should remove the deleted item from the local state', () => {
      const action = {
        type: PostActions.DELETE_COMPLETE,
        post: mockPost
      };
      const state = postReducer({
        posts: [mockPost],
        isLoading: true,
        hasErrors: false
      }, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.hasErrors).toBeFalsy();
      expect(state.posts).toBeGreaterThanOrEqual(0);
      expect(state.posts.filter(post => post.id === mockPost.id).length).toEqual(0);
    });
  });
});
