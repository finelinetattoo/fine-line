import { BodyPart } from '../enums/body-part.enum';
import { TattooSize } from '../enums/tattoo-size.enum';

export interface Tattoo {
  id: number;
  clientId: number;
  artistId: number;
  size: TattooSize;
  price: number;
  date: string;
  bodyPart: BodyPart;
  style: string;
  notes?: string;
}
