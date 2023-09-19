import { Test, TestingModule } from '@nestjs/testing';
import { quoteService } from './quote.service';

describe('quoteService', () => {
  let service: quoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [quoteService],
    }).compile();

    service = module.get<quoteService>(quoteService);
  });
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
