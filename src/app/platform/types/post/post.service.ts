import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Posts, Post } from './post.models';

@Injectable()
export abstract class PostService {
  abstract list(): Observable<Posts>;

  abstract show(post: Partial<Post>): Observable<Post>;

  abstract create(post: Partial<Post>): Observable<any>;

  abstract update(post: Partial<Post>): Observable<any>;

  abstract remove(post: Partial<Post>): Observable<any>;
}
