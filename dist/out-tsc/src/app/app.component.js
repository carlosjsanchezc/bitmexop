import * as tslib_1 from "tslib";
import { BitmexService } from './bitmex.service';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, storage, bitmex) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.storage = storage;
        this.bitmex = bitmex;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.statusBar.styleDefault();
                        this.splashScreen.hide();
                        _a = this.bitmex;
                        return [4 /*yield*/, this.storage.get('id')];
                    case 1:
                        _a.id = _c.sent();
                        _b = this.bitmex;
                        return [4 /*yield*/, this.storage.get('secret')];
                    case 2:
                        _b.secret = _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            Storage, BitmexService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map