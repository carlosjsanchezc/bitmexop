import * as tslib_1 from "tslib";
import { BitmexService } from './../bitmex.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { isUndefined } from 'util';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(http, bitmex) {
        this.http = http;
        this.bitmex = bitmex;
        this.symbol = "XBTUSD";
        this.type = "Market";
        this.price = 0;
        this.xbtusd = 0;
        this.ethusd = 0;
        this.ltcu19 = 0;
        this.xrpu19 = 0;
        this.sl = 0;
        this.tp = 0;
        this.bsl = true;
        this.btp = true;
        this.quantity = 1000;
        this.mensaje1 = "";
        this.mensaje2 = "";
        this.mensaje3 = "";
        this.wsurl = "wss://testnet.bitmex.com/realtime?subscribe=instrument";
        this.ws = new WebSocket(this.wsurl);
        this.leverage = 5;
        var xbtusd = 0;
    }
    Tab1Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.ws.onerror = function (e) {
            console.log("Estamos en error");
            _this.ws.send("ping");
            _this.ws = new WebSocket(_this.wsurl);
            _this.ionViewDidEnter();
        };
        this.ws.onmessage = function (e) {
            //console.log('Server: ' + e.data);
            var dataserver = e.data;
            var d = dataserver;
            if (d.indexOf("lastPrice") > 0) {
                var objData = JSON.parse(dataserver);
                if (objData.data[0].symbol == "XBTUSD") {
                    if (!isUndefined(objData.data[0].lastPrice)) {
                        _this.xbtusd = objData.data[0].lastPrice;
                    }
                }
                if (objData.data[0].symbol == "ETHUSD") {
                    if (!isUndefined(objData.data[0].lastPrice)) {
                        _this.ethusd = objData.data[0].lastPrice;
                    }
                }
                if (objData.data[0].symbol == "LTCU19") {
                    if (!isUndefined(objData.data[0].lastPrice)) {
                        _this.ltcu19 = objData.data[0].lastPrice;
                    }
                }
                if (objData.data[0].symbol == "XRPU19") {
                    if (!isUndefined(objData.data[0].lastPrice)) {
                        _this.xrpu19 = objData.data[0].lastPrice;
                    }
                }
            }
        };
    };
    Tab1Page.prototype.OnMessages = function () {
    };
    Tab1Page.prototype.Buy = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.bitmex.leverage = this.leverage;
                        return [4 /*yield*/, this.bitmex.CreateOrder(this.symbol, this.type, "Buy", this.price, this.quantity)];
                    case 1:
                        _a.sent();
                        if (!this.bsl) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.bitmex.CreateOrder(this.symbol, "Stop", "Sell", this.sl, this.quantity)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!this.btp) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.bitmex.CreateOrder(this.symbol, "MarketIfTouched", "Sell", this.tp, this.quantity)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.Sell = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resppos, dataor, error, respsl, datasl, error, resptp, datatp, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.bitmex.leverage = this.leverage;
                        this.bitmex.params = this.params;
                        this.mensaje1 = "";
                        this.mensaje2 = "";
                        this.mensaje3 = "";
                        return [4 /*yield*/, this.bitmex.CreateOrder(this.symbol, this.type, "Sell", this.price, this.quantity)];
                    case 1:
                        resppos = _a.sent();
                        if (resppos.status == 200) {
                            dataor = JSON.parse(resppos.data);
                            //console.log("Orden creada",resppos.data);
                            this.mensaje1 = "Orden creada: " + dataor['orderID'];
                        }
                        else {
                            error = JSON.parse(resppos.error);
                            //console.log("Objeto error:",JSON.stringify(error));
                            this.mensaje3 = "Error Position: " + error.error.message;
                        }
                        if (!(this.bsl == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.bitmex.CreateOrder(this.symbol, "Stop", "Buy", this.sl, this.quantity)];
                    case 2:
                        respsl = _a.sent();
                        if (respsl.status == 200) {
                            datasl = JSON.parse(respsl.data);
                            // console.log("Orden SL creada");
                            this.mensaje2 = "Orden SL Creada: " + datasl['orderID'];
                        }
                        else {
                            error = JSON.parse(respsl.error);
                            //console.log("Objeto error:",JSON.stringify(error));
                            this.mensaje3 = "Error orden SL: " + error.error.message;
                        }
                        _a.label = 3;
                    case 3:
                        if (!(this.btp == true)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.bitmex.CreateOrder(this.symbol, "MarketIfTouched", "Buy", this.tp, this.quantity)];
                    case 4:
                        resptp = _a.sent();
                        if (resptp.status == 200) {
                            datatp = JSON.parse(resptp.data);
                            //console.log("Orden creada",resptp.data);
                            this.mensaje3 = "Orden creada: " + datatp['orderID'];
                        }
                        else {
                            error = JSON.parse(resptp.error);
                            //console.log("Objeto error:",JSON.stringify(error));
                            this.mensaje3 = "Error orden TP: " + error.error.message;
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, BitmexService])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map