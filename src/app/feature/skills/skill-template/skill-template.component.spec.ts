import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTemplateComponent } from './skill-template.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SkillTemplateComponent', () => {
  let component: SkillTemplateComponent;
  let fixture: ComponentFixture<SkillTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillTemplateComponent],
      providers:[provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
