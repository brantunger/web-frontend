import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatToolbarModule } from '@angular/material';
import { TopNavigationComponent } from './top-navigation.component';


describe('TopNavigationComponent', () => {
  let component: TopNavigationComponent;
  let fixture: ComponentFixture<TopNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopNavigationComponent],
      imports: [MatToolbarModule, MatDialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
