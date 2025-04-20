import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../client/client.entity';
import { Artist } from '../artist/artist.entity';

export enum TattooSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
}

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

  @Column({ name: 'body_part', type: 'varchar', length: 100 })
  bodyPart: string;

  @Column({ type: 'varchar', length: 100 })
  style: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
