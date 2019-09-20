import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoutBoxComponent } from './shout-box.component';
import { MatCardModule, MatToolbarModule } from '@angular/material';

describe('ShoutBoxComponent', () => {
  let component: ShoutBoxComponent;
  let fixture: ComponentFixture<ShoutBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoutBoxComponent],
      imports: [MatCardModule,
        MatToolbarModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoutBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
