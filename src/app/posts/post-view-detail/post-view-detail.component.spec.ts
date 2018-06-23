import { By, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';

import { PostHeaderComponent } from '@wefox/posts';
import { ActivatedRouteStub } from '@wefox/platform/testing';
import { SETTINGS } from '@wefox/settings';
import { PlatformState, platformReducer } from '@wefox/platform';
import * as PostActions from '@wefox/platform/post';
import { PostViewDetailComponent } from './post-view-detail.component';

describe('PostViewDetailComponent', () => {
  let component: PostViewDetailComponent;
  let fixture: ComponentFixture<PostViewDetailComponent>;
  let store: Store<PlatformState>;
  let titleService: Title;

  const mockPost = {
    id: 256,
    title: 'Barcelona',
    content: 'Barcelona is a city',
    created_at: '2018-06-13T20:24:44.145Z',
    updated_at: '2018-06-13T20:24:44.145Z',
    lat: 41.3851,
    long: 2.1734,
    image_url: 'https://fakeurl/img.png'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: ActivatedRoute,
        useValue: new ActivatedRouteStub({ id: mockPost.id })
      }, {
        provide: Title,
        useClass: Title
      }],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(platformReducer)
      ],
      declarations: [PostViewDetailComponent, PostHeaderComponent]
    })
      .compileComponents()
      .then(() => {
        titleService = TestBed.get(Title);

        store = TestBed.get(Store);
        store.dispatch({ type: PostActions.FETCH_COMPLETE, posts: [mockPost] });

        fixture = TestBed.createComponent(PostViewDetailComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the component with post data for a matching URL ID parameter', () => {
    expect(component.post).toEqual(mockPost);
  });

  it('should render the post name as part of the title', () => {
    expect(titleService.getTitle()).toContain(SETTINGS.appName);
    expect(titleService.getTitle()).toContain(component.post.title);
  });
});
