import { By, Title } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { SETTINGS } from '@wefox/settings';
import { PlatformState, platformReducer } from '@wefox/platform';
import * as PostActions from '@wefox/platform/post';
import { PostsListComponent } from './posts-list.component';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let store: Store<PlatformState>;
  let titleService: Title;

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
      declarations: [PostsListComponent],
      providers: [{ provide: Title, useClass: Title }],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(platformReducer)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    titleService = TestBed.get(Title);
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

  it('should render items in the list', async(() => {
    const el = fixture.debugElement.query(By.css('.items .item .item__name'));
    expect(el.nativeElement.innerText).toBe('Barcelona');
  }));

  it('should assign the default title to the app when execuing this component', () => {
    expect(titleService.getTitle()).toEqual(SETTINGS.appName);
  });
});
