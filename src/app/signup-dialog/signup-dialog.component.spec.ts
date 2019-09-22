import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDialogComponent } from './signup-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('SignupDialogComponent', () => {
  let component: SignupDialogComponent;
  let fixture: ComponentFixture<SignupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupDialogComponent ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
