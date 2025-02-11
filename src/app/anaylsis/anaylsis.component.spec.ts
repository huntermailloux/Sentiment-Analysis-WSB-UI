import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaylsisComponent } from './anaylsis.component';

describe('AnaylsisComponent', () => {
  let component: AnaylsisComponent;
  let fixture: ComponentFixture<AnaylsisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaylsisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaylsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
