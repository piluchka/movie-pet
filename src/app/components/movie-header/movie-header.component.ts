import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './movie-header.component.html',
  styleUrl: './movie-header.component.scss',
})
export class MovieHeaderComponent {
  constructor() {}
}
