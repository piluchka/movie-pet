import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-movie-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './movie-sidebar.component.html',
  styleUrl: './movie-sidebar.component.scss',
})
export class MovieSidebarComponent {
  sidebarVisible = false;
}
