import { Test, TestingModule } from '@nestjs/testing';
import { MicoRouterController } from './mico-router.controller';
import { MicoRouterService } from './mico-router.service';

describe('MicoRouterController', () => {
  let controller: MicoRouterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MicoRouterController],
      providers: [MicoRouterService],
    }).compile();

    controller = module.get<MicoRouterController>(MicoRouterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
