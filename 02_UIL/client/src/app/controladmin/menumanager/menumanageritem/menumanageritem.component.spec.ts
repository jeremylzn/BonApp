import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumanageritemComponent } from './menumanageritem.component';

describe('MenumanageritemComponent', () => {
  let component: MenumanageritemComponent;
  let fixture: ComponentFixture<MenumanageritemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumanageritemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumanageritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
