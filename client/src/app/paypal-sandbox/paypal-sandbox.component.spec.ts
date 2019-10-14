import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalSandboxComponent } from './paypal-sandbox.component';

describe('PaypalSandboxComponent', () => {
  let component: PaypalSandboxComponent;
  let fixture: ComponentFixture<PaypalSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalSandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
