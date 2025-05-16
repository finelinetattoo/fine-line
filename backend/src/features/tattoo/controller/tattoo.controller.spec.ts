import { Test, TestingModule } from '@nestjs/testing';
import { TattooController } from './tattoo.controller';

describe('TattooController', () => {
  let controller: TattooController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TattooController],
    }).compile();

    controller = module.get<TattooController>(TattooController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
