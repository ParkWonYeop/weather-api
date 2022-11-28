import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '4131pwy',
  database: 'weather',
  entities: ['dist/entities/**/*.js'],
  synchronize: true,
};

export default ormconfig;
