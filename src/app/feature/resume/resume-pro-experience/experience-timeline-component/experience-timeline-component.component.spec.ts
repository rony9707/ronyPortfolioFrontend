import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceTimelineComponentComponent } from './experience-timeline-component.component';

describe('ExperienceTimelineComponentComponent', () => {
  let component: ExperienceTimelineComponentComponent;
  let fixture: ComponentFixture<ExperienceTimelineComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceTimelineComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceTimelineComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
