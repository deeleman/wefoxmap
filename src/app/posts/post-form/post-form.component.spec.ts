import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { mockPost, ActivatedRouteStub } from '@wefox/platform/testing';
import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub({});

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: activatedRouteStub
      }],
      declarations: [ PostFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Save New Post" in the submit button for blank forms', () => {
    const submitLabel = fixture.nativeElement.querySelector('.postform__submit-text');
    expect(submitLabel.textContent).toEqual('Save New Post');
  });

  it('should display "Update Post" in the submit button for blank forms', () => {
    component.post = mockPost;
    fixture.detectChanges();
    const submitLabel = fixture.nativeElement.querySelector('.postform__submit-text');
    expect(submitLabel.textContent).toEqual('Update Post');
  });

  it('should populate the form when injecting a Post object thru input props', async(() => {
    component.post = mockPost;
    fixture.detectChanges();
    setTimeout(() => {
      const { id, created_at, updated_at } = mockPost;
      expect({ id, created_at, updated_at, ...component.postForm.value }).toEqual(mockPost);
    });
  }));

  it('should inform user about picking coords when not selected already', () => {
    const coordsLabel = fixture.nativeElement.querySelector('.postform__coords-label');
    expect(coordsLabel.textContent).toEqual('Choose Location Coordinates');
  });

  it('should update the coords when changed at the querystring', async(() => {
    component.post = mockPost;
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.postForm.get('lat').value).toEqual(mockPost.lat);
      expect(component.postForm.get('long').value).toEqual(mockPost.long);

      const mockPickedCoors = { lat: 51.89658118497889, lng: 18.80859375 };
      activatedRouteStub.setQueryParamMap(mockPickedCoors);
      fixture.detectChanges();
      setTimeout(() => {
        expect(component.postForm.get('lat').value).toEqual(mockPickedCoors.lat);
        expect(component.postForm.get('long').value).toEqual(mockPickedCoors.lng);
      });
    });
  }));
});
