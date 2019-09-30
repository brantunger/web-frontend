import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialogComponent } from './login-dialog.component';
import { MAT_DIALOG_DATA, MatIconModule, MatInputModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebApiService } from '../services/web-api.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  const mockWebApiService = jasmine.createSpyObj('WebApiService', ['authenticate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginDialogComponent],
      imports: [
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: WebApiService, useValue: mockWebApiService },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
