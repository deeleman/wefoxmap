import { By, Title } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { SETTINGS } from '@wefox/settings';
import { PlatformState, platformReducer } from '@wefox/platform';
import { mockPosts } from '@wefox/platform/testing';
import * as PostActions from '@wefox/platform/post';
import { PostsListComponent } from './posts-list.component';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let store: Store<PlatformState>;
  let titleService: Title;

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
