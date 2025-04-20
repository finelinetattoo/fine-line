import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // OneToMany
} from 'typeorm';
// import { Tattoo } from '../tattoo/tattoo.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  bio: string;
}
