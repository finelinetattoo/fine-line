import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct placeholder in the input', () => {
    component.placeholder = 'Buscar clientes';
    fixture.detectChanges();
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    expect(inputElement.placeholder).toContain('🔍 Buscar clientes');
  });


});
