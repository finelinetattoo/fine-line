import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sortable-header',
  imports: [],
  templateUrl: './sortable-header.component.html',
  styleUrl: './sortable-header.component.scss',
})
export class SortableHeaderComponent {
  @Input() label = '';
  @Input() columnKey = '';
  @Input() activeSortKey: string | null = null;
  @Input() sortDirection: 'asc' | 'desc' | null = null;

  @Output() sort = new EventEmitter<string>();

  toggleSort(): void {
    this.sort.emit(this.columnKey);
  }
}
