import { Title } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SETTINGS } from '@wefox/settings';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Title, useClass: Title}],
      declarations: [NotFoundComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    titleService = TestBed.get(Title);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign an error to the app when execuing this component', () => {
    expect(titleService.getTitle()).toEqual(SETTINGS.titles.notFound);
  });
});
