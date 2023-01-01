import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm/index';

import { localEntity } from './local.entity';

@Unique(['date', 'time', 'area'])
@Entity('weather_info')
export class weatherEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  area: number;

  @Column({ length: 10 })
  date: string;

  @Column({ type: 'int' })
  time: number;

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

  static create(weatherInfo) {
    const weather = new weatherEntity();
    weather.area = weatherInfo.area;
    weather.date = weatherInfo.date;
    weather.time = weatherInfo.time;
    weather.PTY = weatherInfo.PTY;
    weather.REH = weatherInfo.REH;
    weather.RN1 = weatherInfo.RN1;
    weather.T1H = weatherInfo.T1H;
    weather.UUU = weatherInfo.UUU;
    weather.VVV = weatherInfo.VVV;
    weather.VEC = weatherInfo.VEC;
    weather.WSD = weatherInfo.WSD;
    return weather;
  }
}
