import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBannerComponent } from './alert-banner.component';
import { MatIconModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AlertBannerComponent', () => {
  let component: AlertBannerComponent;
  let fixture: ComponentFixture<AlertBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertBannerComponent],
      imports: [MatIconModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
