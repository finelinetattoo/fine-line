import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsPageComponent } from './charts-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { TattooService } from '../../tattoos/tattoos-service/tattoo.service';
import { of } from 'rxjs';
import { Tattoo } from '../../../core/interfaces/tattoo';
import { TattooSize } from '../../../core/enums/tattoo-size.enum';
import { BodyPart } from '../../../core/enums/body-part.enum';

describe('ChartsPageComponent', () => {
  let component: ChartsPageComponent;
  let fixture: ComponentFixture<ChartsPageComponent>;
  const mockTattoos = [
    { date: '2025-01-15T00:00:00Z' },
    { date: '2025-01-20T00:00:00Z' },
    { date: '2025-02-05T00:00:00Z' },
    { date: '2025-12-01T00:00:00Z' },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsPageComponent, HttpClientTestingModule],
      providers: [
        {
          provide: TattooService,
          useValue: {
            getAll: () => of(mockTattoos),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            success: () => {},
            error: () => {},
            info: () => {},
            warning: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build barChartData correctly based on tattoos by month', async () => {
    await component.ngOnInit();

    const data = component.barChartData.datasets[0].data;

    expect(data).toBeDefined();
    expect(data.length).toBe(12);

    expect(data[0]).toBe(2);
    expect(data[1]).toBe(1);
    for (let i = 2; i <= 10; i++) {
      expect(data[i]).toBe(0);
    }
    expect(data[11]).toBe(1);
  });

  it('should build doughnutChartData correctly based on body parts', async () => {
    const mockTattoosWithParts: Tattoo[] = [
      {
        id: 1,
        date: '2025-01-01',
        client_id: 1,
        artist_id: 1,
        size: TattooSize.MEDIUM,
        price: 150,
        style: 'REALISM',
        body_part: BodyPart.ARM,
      },
      {
        id: 2,
        date: '2025-01-02',
        client_id: 1,
        artist_id: 1,
        size: TattooSize.MEDIUM,
        price: 150,
        style: 'REALISM',
        body_part: BodyPart.ARM,
      },
      {
        id: 3,
        date: '2025-01-03',
        client_id: 1,
        artist_id: 1,
        size: TattooSize.MEDIUM,
        price: 150,
        style: 'REALISM',
        body_part: BodyPart.LEG,
      },
      {
        id: 4,
        date: '2025-01-04',
        client_id: 1,
        artist_id: 1,
        size: TattooSize.MEDIUM,
        price: 150,
        style: 'REALISM',
        body_part: BodyPart.LEG,
      },
      {
        id: 5,
        date: '2025-01-05',
        client_id: 1,
        artist_id: 1,
        size: TattooSize.MEDIUM,
        price: 150,
        style: 'REALISM',
        body_part: BodyPart.LEG,
      },
      {
        id: 6,
        date: '2025-01-06',
        client_id: 1,
        artist_id: 1,
        size: TattooSize.MEDIUM,
        price: 150,
        style: 'REALISM',
        body_part: BodyPart.BACK,
      },
    ];

    const tattooService = TestBed.inject(TattooService);
    spyOn(tattooService, 'getAll').and.returnValue(of(mockTattoosWithParts));

    await component.ngOnInit();

    const labels = component.doughnutChartData.labels;
    const data = component.doughnutChartData.datasets[0].data;

    expect(labels).toContain('Brazo');
    expect(labels).toContain('Pierna');
    expect(labels).toContain('Espalda');

    const brazoIndex = labels.indexOf('Brazo');
    const piernaIndex = labels.indexOf('Pierna');
    const espaldaIndex = labels.indexOf('Espalda');

    expect(data[brazoIndex]).toBe(2);
    expect(data[piernaIndex]).toBe(3);
    expect(data[espaldaIndex]).toBe(1);
  });
});
