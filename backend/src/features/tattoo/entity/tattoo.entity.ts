import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../../client/entity/client.entity';
import { Artist } from '../../artist/entity/artist.entity';
import { TattooSize } from '../enums/tattoo-size.enum';
import { BodyPart } from '../enums/body-part.enum';
import { TattooStyle } from '../enums/tattoo-style.enum';
@Entity('tattoos')
export class Tattoo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.tattoos, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Artist, (artist) => artist.tattoos, { eager: true })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @Column({ type: 'enum', enum: TattooSize })
  size: TattooSize;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'enum', enum: BodyPart, name: 'body_part' })
  body_part: BodyPart;

  @Column({ type: 'enum', enum: TattooStyle })
  style: TattooStyle;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
