/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidacaoService } from './validacao.service';

describe('ValidacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidacaoService]
    });
  });

  it('should ...', inject([ValidacaoService], (service: ValidacaoService) => {
    expect(service).toBeTruthy();
  }));
});
