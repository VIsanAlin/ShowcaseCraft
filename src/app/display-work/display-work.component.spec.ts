import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWorkComponent } from './display-work.component';

describe('DisplayWorkComponent', () => {
  let component: DisplayWorkComponent;
  let fixture: ComponentFixture<DisplayWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
