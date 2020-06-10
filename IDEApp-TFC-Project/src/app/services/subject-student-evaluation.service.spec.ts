import { TestBed } from '@angular/core/testing';

import { SubjectStudentEvaluationService } from './subject-student-evaluation.service';

describe('SubjectStudentEvaluationService', () => {
  let service: SubjectStudentEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectStudentEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
