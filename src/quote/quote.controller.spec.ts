import { Test, TestingModule } from '@nestjs/testing';
import { quoteController } from './quote.controller';
import { quoteService } from './quote.service';

describe('quoteController', () => {
  let controller: quoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [quoteController],
      providers: [quoteService],
    }).compile();

    controller = module.get<quoteController>(quoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
