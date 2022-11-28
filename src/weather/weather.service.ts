import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { localEntity } from 'src/entities/local.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(localEntity)
    private localRepository: Repository<localEntity>,
  ) {
    this.localRepository = localRepository;
  }

  async findAll(): Promise<localEntity> {
    return this.localRepository.findOne({ id: 1 });
  }
}
