import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiertySingleComponent } from './propierty-single.component';

describe('PropiertySingleComponent', () => {
  let component: PropiertySingleComponent;
  let fixture: ComponentFixture<PropiertySingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiertySingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiertySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
