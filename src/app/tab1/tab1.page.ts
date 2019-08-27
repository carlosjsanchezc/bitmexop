import { BitmexService } from './../bitmex.service';
import { RealtimeService } from './../realtime.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { isUndefined } from 'util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  symbol: string = "XBTUSD";
  type: string = "Market";
  price: number = 0;
  xbtusd: number = 0;
  ethusd: number = 0;
  ltcu19: number = 0;
  xrpu19: number = 0;
  sl: number = 0;
  tp: number = 0;
  bsl:boolean=false;
  btp:boolean=false;
  quantity: number = 1000;
  wsurl: string = "wss://testnet.bitmex.com/realtime?subscribe=instrument";
  ws = new WebSocket(this.wsurl);
  leverage: number = 5;
  constructor(private http: HttpClient, private bitmex: BitmexService) {
    
    let xbtusd = 0;

  }
  
  ionViewDidEnter(){
    
    this.ws.onerror = (e) => {
      console.log("Estamos en error");
      this.ws.send("ping");
      this.ws = new WebSocket(this.wsurl);
      this.ionViewDidEnter();
    }
    this.ws.onmessage = (e) => {
      //console.log('Server: ' + e.data);
      let dataserver = e.data;
      let d: string = dataserver;

      if (d.indexOf("lastPrice") > 0) {
        let objData = JSON.parse(dataserver);
        if (objData.data[0].symbol == "XBTUSD") {
          if (!isUndefined(objData.data[0].lastPrice)) {
            this.xbtusd = objData.data[0].lastPrice;
          }
        }
        if (objData.data[0].symbol == "ETHUSD") {
          if (!isUndefined(objData.data[0].lastPrice)) {
            this.ethusd = objData.data[0].lastPrice;
          }
        }
        if (objData.data[0].symbol == "LTCU19") {
          if (!isUndefined(objData.data[0].lastPrice)) {
            this.ltcu19 = objData.data[0].lastPrice;
          }
        }
        if (objData.data[0].symbol == "XRPU19") {
          if (!isUndefined(objData.data[0].lastPrice)) {
            this.xrpu19 = objData.data[0].lastPrice;
          }
        }
      }
    };


  }
  OnMessages(){
    
  }
  Buy() {
    this.bitmex.leverage = this.leverage;
    this.bitmex.CreateOrder(this.symbol, this.type, "Buy", this.price, this.quantity).then(data => {
      if (this.bsl||this.sl<this.price){
        
        this.bitmex.SetStopLoss(this.symbol,"Buy",this.sl,this.quantity);
      }
    });
    
    // wss=new WebSocket("wss://testnet.bitmex.com/realtime?subscribe=instrument,orderBook:XBTUSD");
    //wss.dispatchEvent(event)

  }
  async  Sell() {
    this.bitmex.leverage = this.leverage;
    //this.bitmex.SetStopLoss(this.symbol,"Sell",this.sl,this.quantity);
     await this.bitmex.CreateOrder(this.symbol, this.type, "Sell", this.price, this.quantity)    ;
     await this.bitmex.CreateOrder(this.symbol, "Stop", "Buy", this.sl, this.quantity);
     await this.bitmex.CreateOrder(this.symbol, "LimitIfTouched", "Sell", this.tp, this.quantity);
     
     

  }
}
