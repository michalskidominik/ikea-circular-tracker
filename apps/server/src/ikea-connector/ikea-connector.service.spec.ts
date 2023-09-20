import { Test, TestingModule } from '@nestjs/testing';
import { IkeaConnectorService } from './ikea-connector.service';

describe('IkeaConnectorService', () => {
  let service: IkeaConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IkeaConnectorService],
    }).compile();

    service = module.get<IkeaConnectorService>(IkeaConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
