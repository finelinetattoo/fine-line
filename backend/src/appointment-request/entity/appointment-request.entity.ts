import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('appointment_requests')
export class AppointmentRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  surname: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  is_adult: boolean;

  @Column()
  is_first_time: boolean;

  @Column('text', { nullable: true })
  medical_conditions: string;

  @Column({ length: 100, nullable: true })
  instagram_handle: string;

  @Column('text')
  tattoo_description: string;

  @Column('text')
  body_part: string;

  @Column('int')
  size_height_cm: number;

  @Column('int')
  size_width_cm: number;

  @Column('text')
  image_1_url: string;

  @Column('text')
  image_2_url: string;

  @Column('text')
  image_3_url: string;

  @Column({
    type: 'enum',
    enum: ['morning', 'afternoon', 'weekend', 'any'],
  })
  availability: 'morning' | 'afternoon' | 'weekend' | 'any';

  @Column('text', { nullable: true })
  additional_comments: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ default: false })
  isRead: boolean;
}
