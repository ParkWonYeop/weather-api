import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity('local_information')
export class localEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  area_code: number;

  @Column({ length: 30 })
  County: string;

  @Column({ length: 30 })
  City: string;

  @Column({ type: 'int' })
  grid_x: number;

  @Column({ type: 'int' })
  grid_y: number;

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'double' })
  latitude: number;
}
