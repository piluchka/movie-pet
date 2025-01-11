import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MovieSidebarComponent } from '../movie-sidebar/movie-sidebar.component';

@Component({
  selector: 'app-movie-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, MovieSidebarComponent],
  templateUrl: './movie-header.component.html',
  styleUrl: './movie-header.component.scss',
})
export class MovieHeaderComponent {
  constructor() {}
}
