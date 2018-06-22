import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { PlatformState, platformReducer, PlatformModule, PostService } from '@wefox/platform';
import * as PostActions from '@wefox/platform/post';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: any;
  let appComponent: ComponentFixture<AppComponent>;
  let store: Store<PlatformState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        PlatformModule,
        RouterTestingModule,
        StoreModule.forRoot(platformReducer)
      ],
      providers: [PostService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.debugElement.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(appComponent).toBeTruthy();
  }));

  it('should dispatch the fetch action to load posts when created', () => {
    const action = new PostActions.Fetch();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
