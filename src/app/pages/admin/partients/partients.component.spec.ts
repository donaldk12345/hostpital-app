import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartientsComponent } from './partients.component';

describe('PartientsComponent', () => {
  let component: PartientsComponent;
  let fixture: ComponentFixture<PartientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
