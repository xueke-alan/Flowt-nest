import { Test, TestingModule } from '@nestjs/testing';
import { QuotoService } from './quoto.service';

describe('QuotoService', () => {
  let service: QuotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotoService],
    }).compile();

    service = module.get<QuotoService>(QuotoService);
  });
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
