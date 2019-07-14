import { BitmexService } from './../bitmex.service';
import { RealtimeService } from './../realtime.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  symbol:string="XBTUSD";
  type:string="Market";
  price:number=0;
  quantity:number=1000;
  leverage:number=5;
  constructor(private http: HttpClient, private bitmex: BitmexService) {

  }
  Buy() {
    console.log("intentando buy");
    
    this.bitmex.leverage=this.leverage;
    this.bitmex.CreateOrder(this.symbol,this.type,"Buy",this.price,this.quantity).then(data=>{
      console.log("PARECE");
        console.log(data);
    });

    // wss=new WebSocket("wss://testnet.bitmex.com/realtime?subscribe=instrument,orderBook:XBTUSD");
    //wss.dispatchEvent(event)

  }
  Sell(){

  }
}
