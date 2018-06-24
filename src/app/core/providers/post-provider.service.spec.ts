import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { mockPost, mockPosts } from '@wefox/platform/testing';
import { SETTINGS } from '@wefox/settings';
import { PostProviderService } from './post-provider.service';
import { HttpRequest } from 'selenium-webdriver/http';
import { Posts } from '@wefox/platform';

describe('PostProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [PostProviderService]
    });
  });

  it('should be created', inject([PostProviderService], (service: PostProviderService) => {
    expect(service).toBeTruthy();
  }));

  it(`should issue a GET request to the API when calling the list() method`,
    async(
      inject([
        PostProviderService, HttpTestingController],
        (postProviderService: PostProviderService, backend: HttpTestingController) => {
          postProviderService.list().subscribe(response => {
            expect(response).toEqual(mockPosts);
          });
          backend.expectOne({
            url: `${SETTINGS.api.host}${SETTINGS.api.postsEndpoint}`,
            method: 'GET'
          }).flush(mockPosts);
        })
    )
  );

  it(`should issue a GET request to the API item endpoint when calling the show() method`,
    async(
      inject([
        PostProviderService, HttpTestingController],
        (postProviderService: PostProviderService, backend: HttpTestingController) => {
          postProviderService.show(mockPost).subscribe(response => {
            expect(response).toEqual(mockPost);
          });
          backend.expectOne({
            url: `${SETTINGS.api.host}${SETTINGS.api.postsEndpoint}/${mockPost.id}`,
            method: 'GET'
          }).flush(mockPost);
        })
    )
  );

  it(`should issue a POST request to the API when calling the create() method`,
    async(
      inject([
        PostProviderService, HttpTestingController],
        (postProviderService: PostProviderService, backend: HttpTestingController) => {
          postProviderService.create(mockPost).subscribe();
          const httpCall = backend.expectOne(request => {
            return request.url.match(`${SETTINGS.api.host}${SETTINGS.api.postsEndpoint}`) &&
              request.method === 'POST';
          });

          expect(httpCall.request.body).toEqual({ post: mockPost });
          expect(httpCall.request.url).toEqual(`${SETTINGS.api.host}${SETTINGS.api.postsEndpoint}`);

          backend.verify();
        })
    )
  );

  it(`should issue a PUT request to the API item endpoint when calling the update() method`,
    async(
      inject([
        PostProviderService, HttpTestingController],
        (postProviderService: PostProviderService, backend: HttpTestingController) => {
          postProviderService.update(mockPost).subscribe();

          const httpCall = backend.expectOne(request => {
            return request.url.match(`${SETTINGS.api.host}${SETTINGS.api.postsEndpoint}/${mockPost.id}`) &&
              request.method === 'PUT';
          });

          expect(httpCall.request.body).toEqual({ post: mockPost });
          expect(httpCall.request.url).toEqual(`${SETTINGS.api.host}${SETTINGS.api.postsEndpoint}/${mockPost.id}`);

          backend.verify();
        })
    )
  );

  it(`should issue a DELETE request to the API item endpoint when calling the remove() method`,
    async(
      inject([
        PostProviderService, HttpTestingController],
        (postProviderService: PostProviderService, backend: HttpTestingController) => {
          postProviderService.remove(mockPost).subscribe();
          backend.expectOne({
            url: `${SETTINGS.api.host}${SETTINGS.api.postsEndpoint}/${mockPost.id}`,
            method: 'DELETE'
          });
        })
    )
  );
});
