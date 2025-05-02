import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-main-navigation',
  imports: [RouterModule],
  templateUrl: './main-navigation.component.html',
  styleUrl: './main-navigation.component.scss',
})
export class MainNavigationComponent {
  @Input() links: {
    label: string;
    path?: string;
    children?: { label: string; path: string }[];
  }[] = [];

  dropdownOpen: string | null = null;

  toggleDropdown(label: string) {
    this.dropdownOpen = this.dropdownOpen === label ? null : label;
  }

  closeDropdown() {
    this.dropdownOpen = null;
  }
}
