import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
    selector: 'app-movie-details-page',
    standalone: true,
    templateUrl: './movie-details-page.component.html',
    styleUrl: './movie-details-page.component.scss',
    imports: [CommonModule, MovieCardComponent]
})
export class MovieDetailsPageComponent {}
