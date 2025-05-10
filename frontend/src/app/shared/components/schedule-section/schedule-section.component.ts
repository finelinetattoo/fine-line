import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-schedule-section',
  imports: [CommonModule],
  templateUrl: './schedule-section.component.html',
  styleUrl: './schedule-section.component.scss',
})
export class ScheduleSectionComponent {
  @Input() openingHours: { day: string; hours: string[] }[] = [];
}
