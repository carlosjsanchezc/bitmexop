import { BitmexService } from './../bitmex.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  id:string="LHy6MoqSreBWl3NxKE3dQdN3";
  secret:string="bCKND8pl_-I89v5yHuKgMa8fjy9E4FZVUPUvtDC4UMhRCq-j";
  busy:boolean=false;
  message:string="";
  constructor(private bitmex:BitmexService) {}

Validar(){
  this.busy=true;
  this.bitmex.id=this.id;
  this.bitmex.secret=this.secret;
  this.bitmex.getBalance().then(data=>{
    console.log("non service");
    console.log(data);
    if (data.status==401)
    {
      let datajson=JSON.parse(data.error);
      
      this.message=datajson.message;
    }
    else
    {
      console.log("Data");
  
      let datajson=JSON.parse(data.data);
      console.log(datajson);
      let walletbtc:number=datajson.walletBalance/100000000;
      this.message="Account Validated your balance is:"+walletbtc.toString()+"BTC";
    }
    this.busy=false;
  });

}
  /*
ID:	
LHy6MoqSreBWl3NxKE3dQdN3
Secret:	
bCKND8pl_-I89v5yHuKgMa8fjy9E4FZVUPUvtDC4UMhRCq-j
*/
}
