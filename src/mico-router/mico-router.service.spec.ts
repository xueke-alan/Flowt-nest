import { Test, TestingModule } from '@nestjs/testing';
import { MicoRouterService } from './mico-router.service';

describe('MicoRouterService', () => {
  let service: MicoRouterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicoRouterService],
    }).compile();

    service = module.get<MicoRouterService>(MicoRouterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
