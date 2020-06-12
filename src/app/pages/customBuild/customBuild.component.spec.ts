import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomBuildComponent} from './customBuild.component';

describe('DetailComponent', () => {
  let component: CustomBuildComponent;
  let fixture: ComponentFixture<CustomBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
