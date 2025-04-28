import { BodyPart } from '../enums/body-part.enum';
import { TattooSize } from '../enums/tattoo-size.enum';

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
}
