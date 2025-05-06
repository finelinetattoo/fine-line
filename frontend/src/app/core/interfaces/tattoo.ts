import { BodyPart } from '../enums/body-part.enum';
import { TattooSize } from '../enums/tattoo-size.enum';
import { Client } from './client';
import { Artist } from './artist';
export interface Tattoo {
  id: number;
  client_id: number;
  artist_id: number;
  size: TattooSize;
  price: number;
  date: string;
  body_part: BodyPart;
  style: string;
  notes?: string;
  client?: Client;
  artist?: Artist;
}
