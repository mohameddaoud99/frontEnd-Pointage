import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRattrapageComponent } from './pre-rattrapage.component';

describe('PreRattrapageComponent', () => {
  let component: PreRattrapageComponent;
  let fixture: ComponentFixture<PreRattrapageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRattrapageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRattrapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
