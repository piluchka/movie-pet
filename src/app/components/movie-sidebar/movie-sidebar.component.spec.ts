import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSidebarComponent } from './movie-sidebar.component';

describe('MovieSidebarComponent', () => {
  let component: MovieSidebarComponent;
  let fixture: ComponentFixture<MovieSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
