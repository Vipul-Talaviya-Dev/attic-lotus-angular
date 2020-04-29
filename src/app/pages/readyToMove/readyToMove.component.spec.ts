import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToMoveComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: ReadyToMoveComponent;
  let fixture: ComponentFixture<ReadyToMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyToMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyToMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
