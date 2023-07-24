import { Test, TestingModule } from '@nestjs/testing';
import { RbacController } from './rbac_.controller';
import { RbacService } from './rbac_.service';

describe('RbacController', () => {
  let controller: RbacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RbacController],
      providers: [RbacService],
    }).compile();

    controller = module.get<RbacController>(RbacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
