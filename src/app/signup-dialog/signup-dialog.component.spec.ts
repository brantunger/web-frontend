import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDialogComponent } from './signup-dialog.component';
import { MAT_DIALOG_DATA, MatIconModule, MatDialogModule, MatInputModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebApiService } from '../services/web-api.service';

describe('SignupDialogComponent', () => {
  let component: SignupDialogComponent;
  let fixture: ComponentFixture<SignupDialogComponent>;
  const mockWebApiService = jasmine.createSpyObj('WebApiService', ['register']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule],
      declarations: [SignupDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: WebApiService, useValue: mockWebApiService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
