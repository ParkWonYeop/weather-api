import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm/index';

import { localEntity } from './local.entity';

@Entity('weather_information')
export class weatherEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @OneToOne((type) => localEntity, (localEntity) => localEntity.id, {
    nullable: false,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'area', referencedColumnName: 'id' })
  area: number;

  @Column({ length: 30 })
  date: string;

  @Column({ length: 30 })
  time: string;

  @Column({ type: 'int' })
  PTY: number;

  @Column({ type: 'int' })
  REH: number;

  @Column({ type: 'int' })
  RN1: number;

  @Column({ type: 'double' })
  T1H: number;

  @Column({ type: 'double' })
  UUU: number;

  @Column({ type: 'double' })
  VVV: number;

  @Column({ type: 'int' })
  VEC: number;

  @Column({ type: 'double' })
  WSD: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
