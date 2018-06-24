import { Actions } from '@ngrx/effects';
import { Observable, throwError, of } from 'rxjs';
import { cold } from 'jasmine-marbles';

import { mockPost } from '@wefox/platform/testing';
import { Post, Posts } from './post.models';
import { PostEffects } from './post.effects';
import { postReducer, initialState } from './post.reducer';
import * as PostActions from './post.actions';

describe('PostEffects', () => {
  function postServiceStub(methodName: string, response: any) {
    const service = jasmine.createSpyObj('postService', [methodName]);

    const isError = response instanceof Error;
    const serviceResponse = isError ? throwError(response) : of(response);

    service[methodName].and.returnValue(serviceResponse);

    return service;
  }

  describe('fetchPosts$', () => {
    it('responds to fetch actions', () => {
      const source = cold('a', { a: { type: PostActions.FETCH } });
      const serviceStub = postServiceStub('list', []);
      const effects = new PostEffects(new Actions(source), serviceStub);

      const expected = cold('a', { a: { type: PostActions.FETCH_COMPLETE, posts: [] }});
      expect(effects.fetchPosts$).toBeObservable(expected);
    });

    it('spawns fail action upon error', () => {
      const source = cold('a', { a: { type: PostActions.FETCH } });
      const serviceStub = postServiceStub('list', new Error());
      const effects = new PostEffects(new Actions(source), serviceStub);

      const expected = cold('a', { a: { type: PostActions.FETCH_FAIL }});
      expect(effects.fetchPosts$).toBeObservable(expected);
    });
  });

  describe('createPost$', () => {
    it('responds to create actions by triggering the fetch action', () => {
      const source = cold('a', { a: { type: PostActions.CREATE, post: mockPost } });
      const serviceStub = postServiceStub('create', {});
      const effects = new PostEffects(new Actions(source), serviceStub);

      const expected = cold('a', { a: { type: PostActions.FETCH }});
      expect(effects.createPost$).toBeObservable(expected);
    });

    it('spawns create fail action upon error', () => {
      const source = cold('a', { a: { type: PostActions.CREATE, post: mockPost } });
      const serviceStub = postServiceStub('create', new Error());
      const effects = new PostEffects(new Actions(source), serviceStub);

      const expected = cold('a', { a: { type: PostActions.CREATE_FAIL }});
      expect(effects.createPost$).toBeObservable(expected);
    });
  });

  describe('updatePost$', () => {
    it('responds to update actions by triggering the fetch action', () => {
      const source = cold('a', { a: { type: PostActions.UPDATE, post: mockPost } });
      const serviceStub = postServiceStub('update', {});
      const effects = new PostEffects(new Actions(source), serviceStub);

      const expected = cold('a', { a: { type: PostActions.FETCH }});
      expect(effects.updatePost$).toBeObservable(expected);
    });

    it('spawns update fail action upon error', () => {
      const source = cold('a', { a: { type: PostActions.UPDATE, post: mockPost } });
      const serviceStub = postServiceStub('update', new Error());
      const effects = new PostEffects(new Actions(source), serviceStub);

      const expected = cold('a', { a: { type: PostActions.UPDATE_FAIL }});
      expect(effects.updatePost$).toBeObservable(expected);
    });
  });

  describe('deletePost$', () => {
    it('responds to delete actions by triggering the delete complete action', () => {
      const source = cold('a', { a: { type: PostActions.DELETE, post: mockPost } });
      const serviceStub = postServiceStub('remove', mockPost);
      const effects = new PostEffects(new Actions(source), serviceStub);

      const expected = cold('a', { a: { type: PostActions.DELETE_COMPLETE, post: mockPost }});
      expect(effects.deletePost$).toBeObservable(expected);
    });

    it('spawns update fail action upon error', () => {
      const source = cold('a', { a: { type: PostActions.DELETE, post: mockPost } });
      const serviceStub = postServiceStub('remove', new Error());
      const effects = new PostEffects(new Actions(source), serviceStub);

      const expected = cold('a', { a: { type: PostActions.DELETE_FAIL }});
      expect(effects.deletePost$).toBeObservable(expected);
    });
  });
});
