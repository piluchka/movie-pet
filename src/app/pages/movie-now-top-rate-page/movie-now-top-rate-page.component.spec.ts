import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNowTopRatePageComponent } from './movie-now-top-rate-page.component';

describe('MovieNowTopRatePageComponent', () => {
  let component: MovieNowTopRatePageComponent;
  let fixture: ComponentFixture<MovieNowTopRatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieNowTopRatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieNowTopRatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
