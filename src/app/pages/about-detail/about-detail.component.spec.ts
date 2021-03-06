import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AboutDetailComponent} from './about-detail.component';

describe('AboutDetailComponent', () => {
  let component: AboutDetailComponent;
  let fixture: ComponentFixture<AboutDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
