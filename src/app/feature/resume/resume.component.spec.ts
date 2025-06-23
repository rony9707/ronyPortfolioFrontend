import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeComponent } from './resume.component';
import { provideHttpClient } from '@angular/common/http';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResumeComponent);
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
