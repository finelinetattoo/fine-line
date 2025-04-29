import { Component } from '@angular/core';
import { ArtistListComponent } from '../../components/organisms/artist-list/artist-list.component';

@Component({
  selector: 'app-artists',
  imports: [ArtistListComponent],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss',
})
export class ArtistsComponent {}
