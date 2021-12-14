import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendCoinsComponent } from './trend-coins.component';

describe('TrendCoinsComponent', () => {
  let component: TrendCoinsComponent;
  let fixture: ComponentFixture<TrendCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendCoinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
