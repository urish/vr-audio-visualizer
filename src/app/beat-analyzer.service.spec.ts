import { TestBed, inject } from '@angular/core/testing';

import { BeatAnalyzerService } from './beat-analyzer.service';

describe('BeatAnalyzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeatAnalyzerService]
    });
  });

  it('should be created', inject([BeatAnalyzerService], (service: BeatAnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
