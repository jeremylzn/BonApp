import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersHistoryComponent } from './all-orders-history.component';

describe('AllOrdersHistoryComponent', () => {
  let component: AllOrdersHistoryComponent;
  let fixture: ComponentFixture<AllOrdersHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOrdersHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
