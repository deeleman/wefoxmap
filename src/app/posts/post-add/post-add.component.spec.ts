import { Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { PostHeaderComponent, PostFormComponent } from '@wefox/posts';
import { SETTINGS } from '@wefox/settings';
import { PlatformState, platformReducer } from '@wefox/platform';
import { mockPosts } from '@wefox/platform/testing';
import * as PostActions from '@wefox/platform/post';
import { PostAddComponent } from './post-add.component';

describe('PostAddComponent', () => {
  let component: PostAddComponent;
  let fixture: ComponentFixture<PostAddComponent>;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostHeaderComponent,
        PostFormComponent,
        PostAddComponent,
      ],
      providers: [{ provide: Title, useClass: Title }],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(platformReducer)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddComponent);
    component = fixture.componentInstance;
    titleService = TestBed.get(Title);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the "add post" title to the app when execuing this component', () => {
    expect(titleService.getTitle()).toEqual(`New post | ${SETTINGS.appName}`);
  });
});
