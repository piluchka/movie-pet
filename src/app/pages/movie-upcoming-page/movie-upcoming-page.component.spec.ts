import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUpcomingPageComponent } from './movie-upcoming-page.component';

describe('MovieUpcomingPageComponent', () => {
  let component: MovieUpcomingPageComponent;
  let fixture: ComponentFixture<MovieUpcomingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieUpcomingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieUpcomingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
