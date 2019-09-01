import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var RealtimeService = /** @class */ (function () {
    function RealtimeService() {
    }
    RealtimeService.prototype.receiveInstrument = function () {
        //console.log(this.socket.fromEvent('ws'));
        //return this.socket.fromEvent('instrument');
    };
    RealtimeService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RealtimeService);
    return RealtimeService;
}());
export { RealtimeService };
//# sourceMappingURL=realtime.service.js.map