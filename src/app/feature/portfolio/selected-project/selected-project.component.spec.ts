import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedProjectComponent } from './selected-project.component';

describe('SelectedProjectComponent', () => {
  let component: SelectedProjectComponent;
  let fixture: ComponentFixture<SelectedProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
