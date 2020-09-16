import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryComponent } from './refresh.component';

describe('RefreshComponent', () => {
  let component: RetryComponent;
  let fixture: ComponentFixture<RetryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
