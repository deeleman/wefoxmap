import { mockPost } from '@wefox/platform/testing';
import * as PostActions from './post.actions';

describe('PostActions', () => {
  describe('FetchActions', () => {
    it('should create a fetch action', () => {
      const action = new PostActions.Fetch();
      expect(action.type).toEqual(PostActions.FETCH);
    });

    it('should create a fetch complete action', () => {
      const action = new PostActions.FetchComplete([mockPost]);
      expect({...action}).toEqual({ type: PostActions.FETCH_COMPLETE, posts: [mockPost] });
    });

    it('should create a fetch fail action', () => {
      const action = new PostActions.FetchFail();
      expect({...action}).toEqual({ type: PostActions.FETCH_FAIL });
    });
  });

  describe('CreateActions', () => {
    it('should create a create action', () => {
      const action = new PostActions.Create(mockPost);
      expect({...action}).toEqual({ type: PostActions.CREATE, post: mockPost });
    });

    it('should create a create fail action', () => {
      const action = new PostActions.CreateFail();
      expect({...action}).toEqual({ type: PostActions.CREATE_FAIL });
    });
  });

  describe('UpdateActions', () => {
    it('should create an update action', () => {
      const action = new PostActions.Update(mockPost);
      expect({...action}).toEqual({ type: PostActions.UPDATE, post: mockPost });
    });

    it('should create a update fail action', () => {
      const action = new PostActions.UpdateFail();
      expect({...action}).toEqual({ type: PostActions.UPDATE_FAIL });
    });
  });

  describe('DeleteActions', () => {
    it('should create a delete action', () => {
      const action = new PostActions.Delete(mockPost);
      expect({...action}).toEqual({ type: PostActions.DELETE, post: mockPost });
    });

    it('should create a delete complete action', () => {
      const action = new PostActions.DeleteComplete(mockPost);
      expect({...action}).toEqual({ type: PostActions.DELETE_COMPLETE, post: mockPost });
    });

    it('should create a delete fail action', () => {
      const action = new PostActions.DeleteFail();
      expect({...action}).toEqual({ type: PostActions.DELETE_FAIL });
    });
  });
});
