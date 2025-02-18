import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { PagesPaths } from '../../enums/path.enum';
import { panelMenuSettings } from './panel-menu';

@Component({
  selector: 'app-panel-menu',
  standalone: true,
  imports: [CommonModule, PanelMenuModule],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.scss',
})
export class PanelMenuComponent {
  constructor() {
    this.pagePaths = PagesPaths;
    this.items = panelMenuSettings;
  }

  items: MenuItem[] = [];
  pagePaths: any;
}
