import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  imports: [RouterModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  @Input() isOpen = false;
  @Input() links: {
    label: string;
    path?: string;
    children?: { label: string; path: string }[];
  }[] = [];

  @Output() close = new EventEmitter<void>();

  dropdownOpen: string | null = null;

  toggleDropdown(label: string) {
    this.dropdownOpen = this.dropdownOpen === label ? null : label;
  }

  closeMenu() {
    this.close.emit();
    this.dropdownOpen = null;
  }
}
