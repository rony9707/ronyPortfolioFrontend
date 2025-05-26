import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricTemplateComponent } from './metric-template.component';

describe('MetricTemplateComponent', () => {
  let component: MetricTemplateComponent;
  let fixture: ComponentFixture<MetricTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
