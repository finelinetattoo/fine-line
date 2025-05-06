import { Component } from '@angular/core';
import { ArtistListComponent } from '../artists-list/artist-list.component';

@Component({
  selector: 'app-artists-page',
  imports: [ArtistListComponent],
  templateUrl: './artists-page.component.html',
  styleUrl: './artists-page.component.scss',
})
export class ArtistsPageComponent {}
