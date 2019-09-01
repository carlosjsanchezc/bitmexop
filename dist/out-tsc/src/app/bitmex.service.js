import * as tslib_1 from "tslib";
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import jsSHA from 'jssha';
var BitmexService = /** @class */ (function () {
    function BitmexService(webClient, http, platform) {
        this.webClient = webClient;
        this.http = http;
        this.platform = platform;
        this.logged = false;
        this.leverage = 5;
    }
    BitmexService.prototype.ionViewWillEnter = function () {
        this.id = 'LHy6MoqSreBWl3NxKE3dQdN3';
        this.secret = 'bCKND8pl_-I89v5yHuKgMa8fjy9E4FZVUPUvtDC4UMhRCq-j';
    };
    BitmexService.prototype.getBalance = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fecha, balance, nonce, shaObj, hmac, header, url, myd, Datos, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fecha = new Date();
                        balance = { walletBalance: 0, marginBalance: 0 };
                        nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
                        shaObj = new jsSHA("SHA-256", "TEXT");
                        shaObj.setHMACKey(this.secret, "TEXT");
                        shaObj.update("GET/api/v1/user/margin?currency=XBt" + nonce.toString());
                        hmac = shaObj.getHMAC("HEX");
                        header = { 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90' };
                        url = 'https://testnet.bitmex.com/api/v1/user/margin?currency=XBt';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.webClient.get(url, {}, header)];
                    case 2:
                        myd = _a.sent();
                        Datos = JSON.parse(myd.data);
                        this.logged = true;
                        return [2 /*return*/, myd];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BitmexService.prototype.setLeverage = function (symbol, leverage) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fecha, balance, nonce, shaObj, params2, params, hmac, header, url, myd, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fecha = new Date();
                        balance = { walletBalance: 0, marginBalance: 0 };
                        nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
                        shaObj = new jsSHA("SHA-256", "TEXT");
                        shaObj.setHMACKey(this.secret, "TEXT");
                        params2 = { 'leverage': leverage, 'symbol': symbol };
                        params = "leverage=" + leverage.toPrecision() + "&symbol=" + symbol;
                        shaObj.update("POST/api/v1/position/leverage" + nonce.toString() + params);
                        hmac = shaObj.getHMAC("HEX");
                        header = { 'accept-charset': 'UTF-8', 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' };
                        url = 'https://testnet.bitmex.com/api/v1/position/leverage';
                        this.webClient.setSSLCertMode("nocheck");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.webClient.post(url, params2, header)];
                    case 2:
                        myd = _a.sent();
                        return [2 /*return*/, myd];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BitmexService.prototype.getPositions = function (symbol) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fecha, balance, nonce, shaObj, params2, params, hmac, header, url, myd, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fecha = new Date();
                        balance = { walletBalance: 0, marginBalance: 0 };
                        nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
                        shaObj = new jsSHA("SHA-256", "TEXT");
                        shaObj.setHMACKey(this.secret, "TEXT");
                        params2 = { 'symbol': symbol, 'reverse': true };
                        params = "symbol=" + symbol + "&reverse=true";
                        shaObj.update("GET/api/v1/position?" + params + nonce.toString());
                        hmac = shaObj.getHMAC("HEX");
                        header = { 'accept-charset': 'UTF-8', 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' };
                        url = 'https://testnet.bitmex.com/api/v1/position?' + params;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.webClient.get(url, {}, header)];
                    case 2:
                        myd = _a.sent();
                        return [2 /*return*/, myd];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BitmexService.prototype.getActiveOrders = function (symbol) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fecha, balance, nonce, shaObj, params2, params, hmac, header, url, myd, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fecha = new Date();
                        balance = { walletBalance: 0, marginBalance: 0 };
                        nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
                        shaObj = new jsSHA("SHA-256", "TEXT");
                        shaObj.setHMACKey(this.secret, "TEXT");
                        params2 = { 'symbol': symbol, 'reverse': true };
                        params = "symbol=" + symbol + "&reverse=true";
                        shaObj.update("GET/api/v1/order?" + params + nonce.toString());
                        hmac = shaObj.getHMAC("HEX");
                        header = { 'accept-charset': 'UTF-8', 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' };
                        url = 'https://testnet.bitmex.com/api/v1/order?' + params;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.webClient.get(url, {}, header)];
                    case 2:
                        myd = _a.sent();
                        console.log("Trata");
                        console.log(JSON.stringify(myd));
                        return [2 /*return*/, myd];
                    case 3:
                        error_4 = _a.sent();
                        console.log("Hubo error en activeopior");
                        return [2 /*return*/, error_4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BitmexService.prototype.CreateOrder = function (symbol, type, side, price, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var priceStop, fecha, balance, nonce, shaObj, params, params2, hmac, header, url, myd, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setLeverage(symbol, this.leverage)];
                    case 1:
                        _a.sent();
                        priceStop = price;
                        fecha = new Date();
                        balance = { walletBalance: 0, marginBalance: 0 };
                        nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
                        shaObj = new jsSHA("SHA-256", "TEXT");
                        params = "";
                        params2 = {};
                        //{ 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type };
                        shaObj.setHMACKey(this.secret, "TEXT");
                        //console.log("Plataforma:",this.platform.platforms());
                        switch (type) {
                            case "Market":
                                params = "symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type;
                                params2['symbol'] = symbol;
                                params2['side'] = side;
                                params2['orderQty'] = quantity;
                                params2['ordType'] = type;
                                //params2 = { 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type,'stopPx':priceStop };
                                if (this.platform.is("ios")) {
                                    params2['symbol'] = symbol;
                                    params2['side'] = side;
                                    params2['orderQty'] = quantity;
                                    params2['ordType'] = type;
                                    //params2 = { 'ordType': type ,'orderQty': quantity,'side': side,'symbol': symbol ,'stopPx':priceStop  };
                                    params = "ordType=" + type + "&orderQty=" + quantity.toString() + "&side=" + side + "&symbol=" + symbol;
                                }
                                break;
                            case "Stop":
                                //params2 = { 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type };
                                if (this.platform.is("ios")) {
                                    //params2 = { 'ordType': type ,'orderQty': quantity,'side': side,'symbol': symbol  };
                                    params2['symbol'] = symbol;
                                    params2['side'] = side;
                                    params2['orderQty'] = quantity;
                                    params2['stopPx'] = price;
                                    params2['ordType'] = type;
                                    params = "ordType=" + type + "&orderQty=" + quantity.toString() + "&side=" + side + "&stopPx=" + price.toString() + "&symbol=" + symbol;
                                    //params=this.params;
                                }
                                else {
                                    params = "symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type + "&stopPx=" + price.toString();
                                    params2['symbol'] = symbol;
                                    params2['side'] = side;
                                    params2['orderQty'] = quantity;
                                    params2['ordType'] = type;
                                    params2['stopPx'] = price;
                                }
                                break;
                            case "MarketIfTouched":
                                //params2 = { 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type };
                                if (this.platform.is("ios")) {
                                    //params2 = { 'ordType': type ,'orderQty': quantity,'side': side,'symbol': symbol  };
                                    params2['symbol'] = symbol;
                                    params2['side'] = side;
                                    params2['orderQty'] = quantity;
                                    params2['stopPx'] = price;
                                    params2['ordType'] = type;
                                    params = "ordType=" + type + "&orderQty=" + quantity.toString() + "&side=" + side + "&stopPx=" + price.toString() + "&symbol=" + symbol;
                                }
                                else {
                                    params = "symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type;
                                    params2['symbol'] = symbol;
                                    params2['side'] = side;
                                    params2['orderQty'] = quantity;
                                    params2['ordType'] = type;
                                    params2['stopPx'] = price;
                                }
                                break;
                            case "LimitIfTouched":
                                params = "symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type + "&price=" + price.toString();
                                params2['symbol'] = symbol;
                                params2['side'] = side;
                                params2['orderQty'] = quantity;
                                params2['ordType'] = type;
                                params2['price'] = price;
                                //params2 = { 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type };
                                if (this.platform.is("ios")) {
                                    //params2 = { 'ordType': type ,'orderQty': quantity,'side': side,'symbol': symbol  };
                                    params2['symbol'] = symbol;
                                    params2['side'] = side;
                                    params2['orderQty'] = quantity;
                                    params2['ordType'] = type;
                                    params = "ordType=" + type + "&orderQty=" + quantity.toString() + "&side=" + side + "&symbol=" + symbol + "&price=" + price.toString();
                                }
                                break;
                            default:
                                break;
                        }
                        shaObj.update("POST/api/v1/order" + nonce.toString() + params);
                        hmac = shaObj.getHMAC("HEX");
                        header = { 'accept-charset': 'UTF-8', 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' };
                        url = 'https://testnet.bitmex.com/api/v1/order';
                        /*console.log("api-signature:",hmac);
                        console.log("api-key:",this.id);
                        console.log("api-nonce:",nonce);*/
                        /*console.log("Params:", params);
                        console.log("Params2:", JSON.stringify(params2));
                        console.log("Headers:", JSON.stringify(header));
                        /*console.log("Encryptado:", "POST/api/v1/order" + nonce.toString() + params)
                        console.log("Secret:", this.secret);*/
                        this.webClient.setSSLCertMode("nocheck");
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.webClient.post(url, params2, header)];
                    case 3:
                        myd = _a.sent();
                        return [2 /*return*/, myd];
                    case 4:
                        error_5 = _a.sent();
                        console.log("error en llamada", JSON.stringify(error_5));
                        console.log("HD REQ:", error_5);
                        return [2 /*return*/, error_5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BitmexService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HTTP, HttpClient, Platform])
    ], BitmexService);
    return BitmexService;
}());
export { BitmexService };
//# sourceMappingURL=bitmex.service.js.map