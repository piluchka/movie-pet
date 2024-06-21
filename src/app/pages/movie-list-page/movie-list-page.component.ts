import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieListComponent } from "../../components/movie-list/movie-list.component";

@Component({
    selector: 'app-movie-list-page',
    standalone: true,
    templateUrl: './movie-list-page.component.html',
    styleUrl: './movie-list-page.component.scss',
    imports: [CommonModule, MovieListComponent]
})
export class MovieListPageComponent {}
