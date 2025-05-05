import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoaderComponent } from '../../atoms/loader/loader.component';
import { SearchBarComponent } from '../../atoms/search-bar/search-bar.component';
import { SortableHeaderComponent } from '../../atoms/sortable-header/sortable-header.component';

@Component({
  selector: 'app-admin-list',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    LoaderComponent,
    SearchBarComponent,
    SortableHeaderComponent,
  ],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent {
  @Input() loading: boolean = false;
  @Input() data: any[] = [];
  @Input() columns: { label: string; key: string; pipe?: string }[] = [];
  @Input() createButtonText: string = 'Crear';
  @Input() onCreate!: () => void;
  @Input() onEdit!: (item: any) => void;
  @Input() onDelete!: (id: number) => void;
  @Input() enableSearch: boolean = false;
  @Input() searchPlaceholder: string = 'Buscar...';
  @Input() onSearch?: (term: string) => void;
  @Input() onReset?: () => void;
  @Input() sortKey: string | null = null;
  @Input() sortDirection: 'asc' | 'desc' | null = null;
  @Input() onSort?: (key: string) => void;
}
