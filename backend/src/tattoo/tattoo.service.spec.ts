import { Test, TestingModule } from '@nestjs/testing';
import { TattooService } from './tattoo.service';

describe('TattooService', () => {
  let service: TattooService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TattooService],
    }).compile();

    service = module.get<TattooService>(TattooService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
