import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPropertyComponent } from './card-property.component';

describe('CardPropertyComponent', () => {
  let component: CardPropertyComponent;
  let fixture: ComponentFixture<CardPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
