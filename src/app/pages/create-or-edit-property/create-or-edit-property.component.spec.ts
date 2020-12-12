import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditPropertyComponent } from './create-or-edit-property.component';

describe('CreateOrEditPropertyComponent', () => {
  let component: CreateOrEditPropertyComponent;
  let fixture: ComponentFixture<CreateOrEditPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
