import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePrivacyComponent } from './notice-privacy.component';

describe('NoticePrivacyComponent', () => {
  let component: NoticePrivacyComponent;
  let fixture: ComponentFixture<NoticePrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticePrivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
