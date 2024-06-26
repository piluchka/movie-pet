import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './movie-header.component.html',
  styleUrl: './movie-header.component.scss',
})
export class MovieHeaderComponent {
  @Input() favoriteMovies: any;
  @Input() watchLaterMovies: any;

  constructor(private router: Router) {}

  navigateWithData(data: string[], favorite?: string) {
    const dataString = JSON.stringify(data);
    const path = favorite ? 'favorite' : 'watch-later';

    this.router.navigate([{ outlets: { favAndWatch: [path] } }], {
      queryParams: { data: dataString },
    });
  }
}
