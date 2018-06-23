import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeaderComponent, PostFormComponent } from '@wefox/posts';
import { PostAddComponent } from './post-add.component';

describe('PostAddComponent', () => {
  let component: PostAddComponent;
  let fixture: ComponentFixture<PostAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostFormComponent, PostAddComponent, PostHeaderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
