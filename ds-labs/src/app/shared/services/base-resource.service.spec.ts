/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseResourceService } from './base-resource.service';

describe('Service: BaseResource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseResourceService]
    });
  });

  it('should ...', inject([BaseResourceService], (service: BaseResourceService) => {
    expect(service).toBeTruthy();
  }));
});
