import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumanagerComponent } from './menumanager.component';

describe('MenumanagerComponent', () => {
  let component: MenumanagerComponent;
  let fixture: ComponentFixture<MenumanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
