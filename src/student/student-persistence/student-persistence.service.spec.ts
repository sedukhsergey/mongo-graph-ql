import { Test, TestingModule } from '@nestjs/testing';
import { StudentPersistenceService } from './student-persistence.service';

describe('StudentPersistenceService', () => {
  let service: StudentPersistenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentPersistenceService],
    }).compile();

    service = module.get<StudentPersistenceService>(StudentPersistenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
