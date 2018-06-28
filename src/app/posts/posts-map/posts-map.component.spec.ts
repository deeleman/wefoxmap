import { filter } from 'rxjs/operators';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { AgmCoreModule } from '@agm/core';

import { SETTINGS } from '@wefox/settings';
import { PlatformState, platformReducer } from '@wefox/platform';
import { mockPosts } from '@wefox/platform/testing';
import * as PostActions from '@wefox/platform/post';
import { PostsMapComponent } from './posts-map.component';

describe('PostsMapComponent', () => {
  let component: PostsMapComponent;
  let fixture: ComponentFixture<PostsMapComponent>;
  let store: Store<PlatformState>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

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
    router = TestBed.get(Router);
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

  it('should render a new marker icon when QueryString coords are available', async(() => {
    activatedRoute.queryParamMap
      .pipe(filter(paramMap => !!paramMap.get('lat')))
      .subscribe(() => {
        const addMarkersFound = fixture.debugElement.query(By.css('.posts-map__item--new'));
        expect(addMarkersFound).toBeDefined();
    });

    component.onDoubleClick({ coords: { lat: 47.7076378, lng: 3.2299805 } });
    fixture.detectChanges();
  }));

  it('should remove the new marker icon when QueryString coords are null', async(() => {
    component.onDoubleClick({ coords: { lat: 47.7076378, lng: 3.2299805 } });

    activatedRoute.queryParamMap
    .pipe(filter(paramMap => !paramMap.get('lat')))
    .subscribe(() => {
      const addMarkersFound = fixture.debugElement.query(By.css('.posts-map__item--new'));
      expect(addMarkersFound).toBeNull();
    });

    fixture.detectChanges();
    component.onDoubleClick({ coords: undefined });
    fixture.detectChanges();
  }));
});
