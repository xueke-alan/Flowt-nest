import { Test, TestingModule } from '@nestjs/testing';
import { QuotoController } from './quoto.controller';
import { QuotoService } from './quoto.service';

describe('QuotoController', () => {
  let controller: QuotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotoController],
      providers: [QuotoService],
    }).compile();

    controller = module.get<QuotoController>(QuotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
