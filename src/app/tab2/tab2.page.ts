import { BitmexService } from './../bitmex.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  positions:any[];
  activeorders:any=[];
  activeordersethusd:any=[];
  
  mensaje:string="";
  resp1:string;
  busy1:boolean=false;
  busy2:boolean=false;
  symbol:string="XBTUSD";
  constructor(private bitmex:BitmexService) {
    this.positions=[];

    //JSON.parse('[{"account":83181,"symbol":"XBTUSD","currency":"XBt","underlying":"XBT","quoteCurrency":"USD","commission":0.00075,"initMarginReq":0.2,"maintMarginReq":0.005,"riskLimit":20000000000,"leverage":5,"crossMargin":false,"deleveragePercentile":1,"rebalancedPnl":-3784613,"prevRealisedPnl":3738396,"prevUnrealisedPnl":0,"prevClosePrice":10492.5,"openingTimestamp":"2019-07-14T20:00:00.000Z","openingQty":-2000,"openingCost":14970041,"openingComm":-72654,"openOrderBuyQty":0,"openOrderBuyCost":0,"openOrderBuyPremium":0,"openOrderSellQty":0,"openOrderSellCost":0,"openOrderSellPremium":0,"execBuyQty":0,"execBuyCost":0,"execSellQty":0,"execSellCost":0,"execQty":0,"execCost":0,"execComm":-71483,"currentTimestamp":"2019-07-14T20:05:26.007Z","currentQty":-2000,"currentCost":14970041,"currentComm":-144137,"realisedCost":-3697959,"unrealisedCost":18668000,"grossOpenCost":0,"grossOpenPremium":0,"grossExecCost":0,"isOpen":true,"markPrice":10567.6,"markValue":18926000,"riskValue":18926000,"homeNotional":-0.18926,"foreignNotional":2000,"posState":"","posCost":18668000,"posCost2":18668000,"posCross":71429,"posInit":3733600,"posComm":16855,"posLoss":0,"posMargin":3821884,"posMaint":110195,"posAllowance":0,"taxableMargin":0,"initMargin":0,"maintMargin":4079884,"sessionMargin":0,"targetExcessMargin":0,"varMargin":0,"realisedGrossPnl":3697959,"realisedTax":0,"realisedPnl":3842096,"unrealisedGrossPnl":258000,"longBankrupt":0,"shortBankrupt":0,"taxBase":3955959,"indicativeTaxRate":0,"indicativeTax":0,"unrealisedTax":0,"unrealisedPnl":258000,"unrealisedPnlPcnt":0.0138,"unrealisedRoePcnt":0.0691,"simpleQty":null,"simpleCost":null,"simpleValue":null,"simplePnl":null,"simplePnlPcnt":null,"avgCostPrice":10713.5,"avgEntryPrice":10713.5,"breakEvenPrice":10745.5,"marginCallPrice":13370.5,"liquidationPrice":13370.5,"bankruptPrice":13455,"timestamp":"2019-07-14T20:05:26.007Z","lastPrice":10567.6,"lastValue":18926000}]');
    console.log(this.positions);
    setInterval(() => { 
      this.ionViewWillEnter(); // Now the "this" still references the component
   }, 30000);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }
  async DeleteOrder(id){
    console.log("borrar:",id);
    
    await this.bitmex.delOrder(id);
    this.ionViewWillEnter();
  }
  async DeleteOrders(symbol){
  console.log("borrar:",symbol);
  
  await this.bitmex.cancelPositionsSymbols(symbol);
  this.ionViewWillEnter();
}
  async ionViewWillEnter(){
   
    
    this.busy1=true;
    let c=await this.bitmex.getPositions("XBTUSD");
    this.positions=JSON.parse(c.data);
    this.busy1=false;
    this.busy2=true;
    let d=await this.bitmex.getActiveOrders("XBTUSD");
    this.busy2=false;
    console.log("Posiciones:",c.data);
    console.log("Ordenes activas:",d.data);
    this.activeorders=JSON.parse(d);
    //console.log("Ordenes Activas:",this.activeorders);
    let e=await this.bitmex.getActiveOrders("ETHUSD");
    this.busy2=false;
    console.log("Posiciones:",c.data);
    console.log("Ordenes activas:",d.data);
    this.activeordersethusd=JSON.parse(e);
  }

}
