import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DemandLocationComponent} from './demandLocation.component';

describe('DemandLocationComponent', () => {
  let component: DemandLocationComponent;
  let fixture: ComponentFixture<DemandLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
