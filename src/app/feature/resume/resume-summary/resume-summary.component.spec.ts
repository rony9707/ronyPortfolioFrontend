import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSummaryComponent } from './resume-summary.component';

describe('ResumeSummaryComponent', () => {
  let component: ResumeSummaryComponent;
  let fixture: ComponentFixture<ResumeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSummaryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResumeSummaryComponent);
    component = fixture.componentInstance;

    (component as any).agnibhaData = () => ({
      info: [
        {}, {}, {}, {}, {}, {}, {}, {},
        { value: 'test value' } // info[8].value
      ]
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
