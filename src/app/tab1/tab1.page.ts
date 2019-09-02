import { BitmexService } from './../bitmex.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { isUndefined } from 'util';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  symbol: string = "XBTUSD";
  busy:boolean=false;
  type: string = "Market";
  price: number = 0;
  xbtusd: number = 0;
  ethusd: number = 0;
  ltcu19: number = 0;
  xrpu19: number = 0;
  preciosymbol=0;
  sl: number = 0;
  tp: number = 0;
  bsl:boolean=false;
  btp:boolean=false;
  quantity: number = 1000;
  mensaje1:string="";
  mensaje2:string="";
  mensaje3:string="";
  selldisabled:boolean=false;
  buydisabled:boolean=false;
  params:string;
  wsurl: string = "wss://testnet.bitmex.com/realtime?subscribe=instrument";
  ws = new WebSocket(this.wsurl);
  leverage: number = 5;
  constructor(private http: HttpClient, private bitmex: BitmexService,private toastController:ToastController) {
    
    let xbtusd = 0;

  }
  
  async ionViewDidEnter(){
    let prices=await this.bitmex.getSymbols();
    this.xbtusd=prices['XBTUSD'];
    this.ethusd=prices['ETHUSD'];
    
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
  async Buy() {
    this.busy=true;
    this.bitmex.leverage = this.leverage;
    this.bitmex.params= this.params;
    this.mensaje1="";
    this.mensaje2="";
    this.mensaje3="";
    let resppos:any;
    if (this.type=="Stop Market"){
      resppos=await this.bitmex.CreateOrder(this.symbol,"Stop", "Buy", this.price, this.quantity)    ;
   
    }
    if (this.type=="Take Profit"){
      resppos=await this.bitmex.CreateOrder(this.symbol,"MarketIfTouched", "Buy", this.price, this.quantity)    ;
   
    }
    if ((this.type=="Limit")||this.type=="Market"){
      resppos=await this.bitmex.CreateOrder(this.symbol, this.type, "Buy", this.price, this.quantity)    ;
   
    }
     //let resppos=await this.bitmex.CreateOrder(this.symbol, this.type, "Buy", this.price, this.quantity)    ;
     if (resppos.status==200){
      //console.log(JSON.stringify(resppos));
      let dataor=JSON.parse(resppos.data);
      //console.log("Orden creada",resppos.data);
      this.mensaje1="Orden creada: "+dataor['orderID'];
      this.presentToast(this.mensaje1);

     } else{
      let error=JSON.parse(resppos.error);
      //console.log("Objeto error:",JSON.stringify(error));
      this.mensaje3="Error Position: "+error.error.message;
     
     }

     
     if (this.bsl==true)     {
      let respsl=await this.bitmex.CreateOrder(this.symbol, "Stop", "Sell", this.sl, this.quantity);
      if (respsl.status==200){
        let datasl=JSON.parse(respsl.data);
       // console.log("Orden SL creada");
        
        this.mensaje2="Orden SL Creada: "+datasl['orderID'];

      }else
      {
        let error=JSON.parse(respsl.error);
         //console.log("Objeto error:",JSON.stringify(error));
         this.mensaje3="Error orden SL: "+error.error.message;
      }
     } 
     //await this.bitmex.CreateOrder(this.symbol, "Stop", "Buy", this.sl, this.quantity);
     
     if (this.btp==true)  
     {
      let resptp=await this.bitmex.CreateOrder(this.symbol, "MarketIfTouched", "Sell", this.tp, this.quantity);
      if (resptp.status==200){
        //console.log(JSON.stringify(resptp));
        let datatp=JSON.parse(resptp.data);
        //console.log("Orden creada",resptp.data);
        this.mensaje3="Orden creada: "+datatp['orderID'];
       } else{
         let error=JSON.parse(resptp.error);
         //console.log("Objeto error:",JSON.stringify(error));
         this.mensaje3="Error orden TP: "+error.error.message;
       }
     } 
     
     this.busy=false;
     
  

  }
  validarsltp(){
    this.selldisabled=false;
    this.buydisabled=false;
    this.preciosymbol=this.xbtusd;
    let var1:string;
    let var2:string;
    if (this.symbol=="ETHUSD") this.preciosymbol=this.ethusd;
    if ((this.bsl==true)){
      if (this.sl>this.preciosymbol){
          console.log("Solo short:");
          var1="short";
      }else 
      {
          console.log("Solo long");
          var1="long";
        }
    }
    if ((this.btp==true)){
      if (this.tp>this.preciosymbol){
          console.log("Solo Long:");
          var2="long";

      }else 
      {
          console.log("Solo Short");
          var2="short";
        }
    }
    if ((this.btp==true)&&(this.bsl==false)){
      var1=var2;
    }
    if ((this.btp==false)&&(this.bsl==true)){
      var2=var1;
    }
    if (var2!=var1){
      this.selldisabled=true;
      this.buydisabled=true;
    }else
    {
      if (var1=="long"){
        this.selldisabled=true;
        this.buydisabled=false;
  
      }else {
        this.selldisabled=false;
        this.buydisabled=true;

      }
    }
       

  }
  

  async  Sell() {
    this.busy=true;
    this.bitmex.leverage = this.leverage;
    this.bitmex.params= this.params;
    this.mensaje1="";
    this.mensaje2="";
    this.mensaje3="";
    let resppos:any;
    if (this.type=="Stop Market"){
      resppos=await this.bitmex.CreateOrder(this.symbol,"Stop", "Sell", this.price, this.quantity)    ;
   
    }
    if (this.type=="Take Profit"){
      resppos=await this.bitmex.CreateOrder(this.symbol,"MarketIfTouched", "Sell", this.price, this.quantity)    ;
   
    }
    if ((this.type=="Limit")||this.type=="Market"){
      resppos=await this.bitmex.CreateOrder(this.symbol, this.type, "Sell", this.price, this.quantity)    ;
   
    }
    
    if (resppos.status==200){
      //console.log(JSON.stringify(resppos));
      let dataor=JSON.parse(resppos.data);
      //console.log("Orden creada",resppos.data);
      this.mensaje1="Orden creada: "+dataor['orderID'];
      this.presentToast(this.mensaje1);

      
     } else{
      let error=JSON.parse(resppos.error);
      //console.log("Objeto error:",JSON.stringify(error));
      this.mensaje1="Error Position: "+error.error.message;
      this.presentToast(this.mensaje1);

     }

     
     if (this.bsl==true)     {
      let respsl=await this.bitmex.CreateOrder(this.symbol, "Stop", "Buy", this.sl, this.quantity);
      if (respsl.status==200){
        let datasl=JSON.parse(respsl.data);
       // console.log("Orden SL creada");
        
        this.mensaje2="Orden SL Creada: "+datasl['orderID'];
        this.presentToast(this.mensaje2);
      

      }else
      {
        let error=JSON.parse(respsl.error);
         //console.log("Objeto error:",JSON.stringify(error));
         this.mensaje3="Error orden SL: "+error.error.message;
         this.presentToast(this.mensaje2);
      
      }
     } 
     //await this.bitmex.CreateOrder(this.symbol, "Stop", "Buy", this.sl, this.quantity);
     if (this.btp==true)  
     {
      let resptp=await this.bitmex.CreateOrder(this.symbol, "MarketIfTouched", "Buy", this.tp, this.quantity);
      if (resptp.status==200){
        //console.log(JSON.stringify(resptp));
        let datatp=JSON.parse(resptp.data);
        //console.log("Orden creada",resptp.data);
        this.mensaje3="Orden creada: "+datatp['orderID'];
        this.presentToast(this.mensaje3);
      
       } else{
         let error=JSON.parse(resptp.error);
         //console.log("Objeto error:",JSON.stringify(error));
         this.mensaje3="Error orden TP: "+error.error.message;
         this.presentToast(this.mensaje3);
      
       }
     } 
     
     this.busy=false;

  }
  async presentToast(message) {
    this.toastController.create({
      message: message,
      duration: 2000,
      animated: true,
      showCloseButton: true,
      closeButtonText: "OK",
      cssClass: "my-toast",
      position: "bottom"
    }).then((obj) => {
      obj.present();
    });
  }
}
