import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { SortableHeaderComponent } from '../../../shared/components/sortable-header/sortable-header.component';

@Component({
  selector: 'app-dashboard-list',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    LoaderComponent,
    SearchBarComponent,
    SortableHeaderComponent,
  ],
  templateUrl: './dashboard-list.component.html',
  styleUrl: './dashboard-list.component.scss',
})
export class DashboardListComponent {
  @Input() loading: boolean = false;
  @Input() data: any[] = [];
  @Input() columns: { label: string; key: string; pipe?: string }[] = [];
  @Input() createButtonText: string = 'Crear';
  @Input() onCreate?: () => void;
  @Input() onEdit?: (item: any) => void;
  @Input() onDelete!: (id: number) => void;
  @Input() enableSearch: boolean = false;
  @Input() searchPlaceholder: string = 'Buscar...';
  @Input() onSearch?: (term: string) => void;
  @Input() onReset?: () => void;
  @Input() sortKey: string | null = null;
  @Input() sortDirection: 'asc' | 'desc' | null = null;
  @Input() onSort?: (key: any) => void;
  @Input() customActions?: (item: any) => void;
}
