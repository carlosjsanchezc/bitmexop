import { TestBed } from '@angular/core/testing';
import { BitmexService } from './bitmex.service';
describe('BitmexService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BitmexService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=bitmex.service.spec.js.map