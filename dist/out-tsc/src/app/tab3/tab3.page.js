import * as tslib_1 from "tslib";
import { BitmexService } from './../bitmex.service';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(bitmex, storage) {
        this.bitmex = bitmex;
        this.storage = storage;
        //="bCKND8pl_-I89v5yHuKgMa8fjy9E4FZVUPUvtDC4UMhRCq-j";
        this.busy = false;
        this.message = "";
    }
    Tab3Page.prototype.Validar = function () {
        var _this = this;
        this.busy = true;
        this.bitmex.id = this.id;
        this.bitmex.secret = this.secret;
        this.bitmex.getBalance().then(function (data) {
            console.log("non service");
            console.log(data);
            if (data.status == 401) {
                var datajson = JSON.parse(data.error);
                _this.message = datajson.message;
            }
            else {
                console.log("Data");
                var datajson = JSON.parse(data.data);
                console.log(datajson);
                var walletbtc = datajson.walletBalance / 100000000;
                _this.message = "Account Validated your balance is:" + walletbtc.toString() + "BTC";
                _this.storage.set("id", _this.id);
                _this.storage.set("secret", _this.secret);
                // Or to get a key/value pair
            }
            _this.busy = false;
        });
    };
    Tab3Page.prototype.ionViewWillEnter = function () {
        this.bitmex.id = 'LHy6MoqSreBWl3NxKE3dQdN3';
        this.bitmex.secret = 'bCKND8pl_-I89v5yHuKgMa8fjy9E4FZVUPUvtDC4UMhRCq-j';
        this.id = this.bitmex.id;
        this.secret = this.bitmex.secret;
    };
    Tab3Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BitmexService, Storage])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map