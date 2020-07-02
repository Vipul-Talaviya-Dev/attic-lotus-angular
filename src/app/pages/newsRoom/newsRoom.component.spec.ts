import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewsRoomComponent} from './newsRoom.component';

describe('NewsRoomComponent', () => {
  let component: NewsRoomComponent;
  let fixture: ComponentFixture<NewsRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
