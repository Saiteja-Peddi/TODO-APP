import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMsgComponent } from './popup-msg.component';

describe('PopupMsgComponent', () => {
  let component: PopupMsgComponent;
  let fixture: ComponentFixture<PopupMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
