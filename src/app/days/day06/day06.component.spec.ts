import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Day06Component } from './day06.component';

describe('Day06Component', () => {
  let component: Day06Component;
  let fixture: ComponentFixture<Day06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Day06Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Day06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
