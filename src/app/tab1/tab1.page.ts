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

  symbol:string="XBTUSD";
  type:string="Market";
  price:number=0;
  xbtusd:number=0;
  ethusd:number=0;
  ltcu19:number=0;
  xrpu19:number=0;
  quantity:number=1000;
  wsurl:string="wss://www.bitmex.com/realtime?subscribe=instrument";
  leverage:number=5;
  constructor(private http: HttpClient, private bitmex: BitmexService) {
    var ws=new WebSocket(this.wsurl);
    let xbtusd=0;
    ws.onmessage=(e)=> {
      //console.log('Server: ' + e.data);
      let dataserver=e.data;
      let d:string=dataserver;
      
      if (d.indexOf("lastPrice")>0)
      {
        let objData=JSON.parse(dataserver);
        if (objData.data[0].symbol=="XBTUSD"){
          if (!isUndefined(objData.data[0].lastPrice)){
            this.xbtusd=objData.data[0].lastPrice;
          }
        }
        if (objData.data[0].symbol=="ETHUSD"){
          if (!isUndefined(objData.data[0].lastPrice)){
            this.ethusd=objData.data[0].lastPrice;
          }
        }
        if (objData.data[0].symbol=="LTCU19"){
          if (!isUndefined(objData.data[0].lastPrice)){
            this.ltcu19=objData.data[0].lastPrice;
          }
        }
        if (objData.data[0].symbol=="XRPU19"){
          if (!isUndefined(objData.data[0].lastPrice)){
            this.xrpu19=objData.data[0].lastPrice;
          }
        }
      }
    };

    setInterval(function ping() {
      ws=new WebSocket(this.wsurl);
    console.log("wssss");
      
    }, 5000);
  }
  Buy() {
    this.bitmex.leverage=this.leverage;
    this.bitmex.CreateOrder(this.symbol,this.type,"Buy",this.price,this.quantity).then(data=>{
    });

    // wss=new WebSocket("wss://testnet.bitmex.com/realtime?subscribe=instrument,orderBook:XBTUSD");
    //wss.dispatchEvent(event)

  }
  Sell(){
    this.bitmex.leverage=this.leverage;
    this.bitmex.CreateOrder(this.symbol,this.type,"Sell",this.price,this.quantity).then(data=>{
    });


  }
}
