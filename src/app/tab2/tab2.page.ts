import { BitmexService } from './../bitmex.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  positions:any;
  constructor(private bitmex:BitmexService) {
    this.positions=[];
<<<<<<< HEAD

=======
>>>>>>> dab4615a617d956394ebb44e6206e213feeb24af
    //JSON.parse('[{"account":83181,"symbol":"XBTUSD","currency":"XBt","underlying":"XBT","quoteCurrency":"USD","commission":0.00075,"initMarginReq":0.2,"maintMarginReq":0.005,"riskLimit":20000000000,"leverage":5,"crossMargin":false,"deleveragePercentile":1,"rebalancedPnl":-3784613,"prevRealisedPnl":3738396,"prevUnrealisedPnl":0,"prevClosePrice":10492.5,"openingTimestamp":"2019-07-14T20:00:00.000Z","openingQty":-2000,"openingCost":14970041,"openingComm":-72654,"openOrderBuyQty":0,"openOrderBuyCost":0,"openOrderBuyPremium":0,"openOrderSellQty":0,"openOrderSellCost":0,"openOrderSellPremium":0,"execBuyQty":0,"execBuyCost":0,"execSellQty":0,"execSellCost":0,"execQty":0,"execCost":0,"execComm":-71483,"currentTimestamp":"2019-07-14T20:05:26.007Z","currentQty":-2000,"currentCost":14970041,"currentComm":-144137,"realisedCost":-3697959,"unrealisedCost":18668000,"grossOpenCost":0,"grossOpenPremium":0,"grossExecCost":0,"isOpen":true,"markPrice":10567.6,"markValue":18926000,"riskValue":18926000,"homeNotional":-0.18926,"foreignNotional":2000,"posState":"","posCost":18668000,"posCost2":18668000,"posCross":71429,"posInit":3733600,"posComm":16855,"posLoss":0,"posMargin":3821884,"posMaint":110195,"posAllowance":0,"taxableMargin":0,"initMargin":0,"maintMargin":4079884,"sessionMargin":0,"targetExcessMargin":0,"varMargin":0,"realisedGrossPnl":3697959,"realisedTax":0,"realisedPnl":3842096,"unrealisedGrossPnl":258000,"longBankrupt":0,"shortBankrupt":0,"taxBase":3955959,"indicativeTaxRate":0,"indicativeTax":0,"unrealisedTax":0,"unrealisedPnl":258000,"unrealisedPnlPcnt":0.0138,"unrealisedRoePcnt":0.0691,"simpleQty":null,"simpleCost":null,"simpleValue":null,"simplePnl":null,"simplePnlPcnt":null,"avgCostPrice":10713.5,"avgEntryPrice":10713.5,"breakEvenPrice":10745.5,"marginCallPrice":13370.5,"liquidationPrice":13370.5,"bankruptPrice":13455,"timestamp":"2019-07-14T20:05:26.007Z","lastPrice":10567.6,"lastValue":18926000}]');
    console.log(this.positions);
    setInterval(() => { 
      this.ionViewWillEnter(); // Now the "this" still references the component
   }, 3000);
  }


  async ionViewWillEnter(){
   
    

    let c=await this.bitmex.getPositions("XBTUSD");
    this.positions=JSON.parse(c.data);
  }

}
