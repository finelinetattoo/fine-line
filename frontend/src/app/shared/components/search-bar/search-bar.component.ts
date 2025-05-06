import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-search-bar',
  imports: [NzInputModule, NzButtonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() placeholder = 'Buscar...';
  @Output() search = new EventEmitter<string>();
  @Output() reset = new EventEmitter<void>();

  searchTerm = signal('');

  onSearch(): void {
    this.search.emit(this.searchTerm().trim());
  }

  onReset(): void {
    this.searchTerm.set('');
    this.reset.emit();
  }

  updateSearchTerm(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.onSearch();
  }
}
