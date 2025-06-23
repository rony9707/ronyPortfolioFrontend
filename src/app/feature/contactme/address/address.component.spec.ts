import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddressComponent);
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
