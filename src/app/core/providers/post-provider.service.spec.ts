import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { mockPost } from '@wefox/platform/testing';
import { SETTINGS } from '@wefox/settings';
import { PostProviderService } from './post-provider.service';

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
          postProviderService.list().subscribe();
          backend.expectOne({
            url: `${SETTINGS.api.host}/${SETTINGS.api.postsEndpoint}`,
            method: 'GET'
          });
        })
    )
  );

  it(`should issue a GET request to the API item endpoint when calling the show() method`,
    async(
      inject([
        PostProviderService, HttpTestingController],
        (postProviderService: PostProviderService, backend: HttpTestingController) => {
          postProviderService.show(mockPost).subscribe();
          backend.expectOne({
            url: `${SETTINGS.api.host}/${SETTINGS.api.postsEndpoint}/${mockPost.id}`,
            method: 'GET'
          });
        })
    )
  );

  it(`should issue a POST request to the API when calling the create() method`,
    async(
      inject([
        PostProviderService, HttpTestingController],
        (postProviderService: PostProviderService, backend: HttpTestingController) => {
          postProviderService.create(mockPost).subscribe();
          backend.expectOne({
            url: `${SETTINGS.api.host}/${SETTINGS.api.postsEndpoint}`,
            method: 'POST'
          });
        })
    )
  );

  it(`should issue a PUT request to the API item endpoint when calling the update() method`,
    async(
      inject([
        PostProviderService, HttpTestingController],
        (postProviderService: PostProviderService, backend: HttpTestingController) => {
          postProviderService.update(mockPost).subscribe();
          backend.expectOne({
            url: `${SETTINGS.api.host}/${SETTINGS.api.postsEndpoint}/${mockPost.id}`,
            method: 'PUT'
          });
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
            url: `${SETTINGS.api.host}/${SETTINGS.api.postsEndpoint}/${mockPost.id}`,
            method: 'DELETE'
          });
        })
    )
  );
});
