import { TestBed } from '@angular/core/testing';

import { WebApiService } from './web-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WebApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [WebApiService]
  }));

  it('should be created', () => {
    const service: WebApiService = TestBed.get(WebApiService);
    expect(service).toBeTruthy();
  });
});
