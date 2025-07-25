import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadResumeComponent } from './download-resume.component';
import { provideHttpClient } from '@angular/common/http';

describe('DownloadResumeComponent', () => {
  let component: DownloadResumeComponent;
  let fixture: ComponentFixture<DownloadResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadResumeComponent],
      providers:[provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
