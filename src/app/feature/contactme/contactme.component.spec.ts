import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactmeComponent } from './contactme.component';

describe('ContactmeComponent', () => {
  let component: ContactmeComponent;
  let fixture: ComponentFixture<ContactmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactmeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactmeComponent);
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
