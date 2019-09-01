import { TestBed } from '@angular/core/testing';
import { RealtimeService } from './realtime.service';
describe('RealtimeService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(RealtimeService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=realtime.service.spec.js.map