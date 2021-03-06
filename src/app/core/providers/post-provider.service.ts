import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { SETTINGS } from '@wefox/settings';
import { PostService, Posts, Post } from '@wefox/platform';

@Injectable()
export class PostProviderService extends PostService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  list(): Observable<Posts> {
    const url = this.getRestEndpoint();
    return this.httpClient.get<Posts>(url).pipe(
      map(posts => posts.map(post => ({ ...post, lat: +post.lat, long: +post.long })))
    );
  }

  show(post: Partial<Post>): Observable<Post> {
    const url = this.getRestEndpoint(post);
    return this.httpClient.get<Post>(url);
  }

  create(post: Partial<Post>): Observable<any> {
    const url = this.getRestEndpoint();
    return this.httpClient.post<Post>(url, { post });
  }

  update(post: Partial<Post>): Observable<any> {
    const url = this.getRestEndpoint(post);
    return this.httpClient.put<Post>(url, { post });

  }

  remove(post: Partial<Post>): Observable<Partial<Post>> {
    const url = this.getRestEndpoint(post);
    return this.httpClient.delete<Post>(url).pipe(
      mergeMap(response => of(post))
    );
  }

  private getRestEndpoint(post?: Partial<Post>): string {
    let apiEndpoint = `${SETTINGS.api.host}${SETTINGS.api.postsEndpoint}`;

    if (post && post.id) {
      apiEndpoint += `/${post.id}`;
    }

    return apiEndpoint;
  }
}
