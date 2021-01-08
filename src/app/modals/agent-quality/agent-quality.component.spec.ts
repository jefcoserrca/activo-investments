import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentQualityComponent } from './agent-quality.component';

describe('AgentQualityComponent', () => {
  let component: AgentQualityComponent;
  let fixture: ComponentFixture<AgentQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentQualityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
