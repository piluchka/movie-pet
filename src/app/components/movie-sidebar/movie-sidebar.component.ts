import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuComponent } from '../panel-menu/panel-menu.component';

@Component({
  selector: 'app-movie-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarModule, ButtonModule, PanelMenuComponent],
  templateUrl: './movie-sidebar.component.html',
  styleUrl: './movie-sidebar.component.scss',
})
export class MovieSidebarComponent {
  sidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
