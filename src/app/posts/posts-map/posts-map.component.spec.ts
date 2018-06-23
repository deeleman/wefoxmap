import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { AgmCoreModule } from '@agm/core';

import { SETTINGS } from '@wefox/settings';
import { PlatformState, platformReducer } from '@wefox/platform';
import * as PostActions from '@wefox/platform/post';
import { PostsMapComponent } from './posts-map.component';

describe('PostsMapComponent', () => {
  let component: PostsMapComponent;
  let fixture: ComponentFixture<PostsMapComponent>;
  let store: Store<PlatformState>;
  let activatedRoute: ActivatedRoute;

  const mockPosts = [{
    id: 2,
    title: 'Barcelona',
    content: 'Barcelona is blah blah blah',
    created_at: '2018-06-13T20:24:44.145Z',
    updated_at: '2018-06-13T20:24:44.145Z',
    lat: 41.3851,
    long: 2.1734,
    image_url: 'https://fakeurl'
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsMapComponent],
      imports: [
        RouterTestingModule,
        RouterModule,
        AgmCoreModule.forRoot({ apiKey: SETTINGS.google.mapKey }),
        StoreModule.forRoot(platformReducer)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(PostsMapComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.dispatch({ type: PostActions.FETCH_COMPLETE, posts: mockPosts });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to subscribe to the data served by the store', async(() => {
    component.posts$.subscribe(posts => {
      expect(posts.length).toBe(mockPosts.length);
    });
  }));

  it('should render items in the list according to the store data', async(() => {
    const elements = fixture.debugElement.queryAll(By.css('.posts-map .posts-map__item'));
    expect(elements.length).toEqual(mockPosts.length);
  }));

  it('should persist the coords as QueryString params upon double clicking on the map ', async(() => {
    const mockPost = mockPosts[0];
    component.onDoubleClick({ coords: { lat: mockPost.lat, lng: mockPost.long } });
    fixture.whenStable().then(() => {
      activatedRoute.queryParamMap.subscribe(paramMap => {
        expect(+paramMap.get('lat')).toEqual(mockPost.lat);
        expect(+paramMap.get('lng')).toEqual(mockPost.long);
      });
    });
  }));
});
