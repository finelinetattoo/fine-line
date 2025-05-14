import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsListComponent } from './clients-list.component';
import { ClientService } from '../clients-service/client.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { Client } from '../../../core/interfaces/client';

describe('ClientsListComponent', () => {
  let component: ClientsListComponent;
  let fixture: ComponentFixture<ClientsListComponent>;

  const mockClients: Client[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      age: 30,
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Ana García',
      age: 28,
      createdAt: '2024-02-01T00:00:00Z',
    },
    {
      id: 3,
      name: 'Carlos Sánchez',
      age: 35,
      createdAt: '2024-03-01T00:00:00Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsListComponent],
      providers: [
        {
          provide: ClientService,
          useValue: {
            getAll: () => of(mockClients),
          },
        },
        {
          provide: NotificationService,
          useValue: {},
        },
        {
          provide: NzModalService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.clients = [...mockClients];
  });

  describe('searchClient()', () => {
    it('should filter clients by name', () => {
      component.searchClient('Ana');
      expect(component.filteredClients.length).toBe(1);
      expect(component.filteredClients[0].name).toBe('Ana García');
    });

    it('should return an empty array if no client matches the search term', () => {
      component.searchClient('alex');
      expect(component.filteredClients.length).toBe(0);
    });

    it('should return all clients when the search term is empty', () => {
      component.searchClient('');
      expect(component.filteredClients.length).toBe(3);
    });
  });

  describe('resetFilters()', () => {
    it('should reset filteredClients to the full clients list', () => {
      component.filteredClients = [mockClients[1]];
      component.resetFilters();
      expect(component.filteredClients.length).toBe(3);
      expect(component.filteredClients).toEqual(mockClients);
    });
  });

  describe('sortClients()', () => {
    it('should sort clients by name ascending', () => {
      component.filteredClients = [...mockClients];
      component.sortClients('name');

      expect(component.sortDirection).toBe('asc');
      expect(component.filteredClients[0].name).toBe('Ana García');
      expect(component.filteredClients[2].name).toBe('Juan Pérez');
    });

    it('should toggle sort direction when the same key is clicked again', () => {
      component.filteredClients = [...mockClients];
      component.sortClients('name');
      component.sortClients('name');

      expect(component.sortDirection).toBe('desc');
      expect(component.filteredClients[0].name).toBe('Juan Pérez');
      expect(component.filteredClients[2].name).toBe('Ana García');
    });

    it('should sort clients by numeric field (age) ascending', () => {
      component.filteredClients = [...mockClients];
      component.sortClients('age');

      expect(component.sortDirection).toBe('asc');
      expect(component.filteredClients[0].age).toBe(28);
      expect(component.filteredClients[2].age).toBe(35);
    });
  });
});
