import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesPageComponent } from './favorite-movies-page.component';

describe('FavoriteMoviesPageComponent', () => {
  let component: FavoriteMoviesPageComponent;
  let fixture: ComponentFixture<FavoriteMoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMoviesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
