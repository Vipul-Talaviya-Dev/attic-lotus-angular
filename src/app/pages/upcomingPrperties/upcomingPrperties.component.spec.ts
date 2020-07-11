import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UpcomingPrpertiesComponent} from './upcomingPrperties.component';

describe('UpcomingPrpertiesComponent', () => {
  let component: UpcomingPrpertiesComponent;
  let fixture: ComponentFixture<UpcomingPrpertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingPrpertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingPrpertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
