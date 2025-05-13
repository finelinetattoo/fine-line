import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { notFoundPageData } from './not-found-page.config';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterModule, ButtonComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  notFoundData = notFoundPageData;
}
