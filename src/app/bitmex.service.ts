import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import jsSHA from 'jssha';

@Injectable({
  providedIn: 'root'
})
export class BitmexService {
  //id: string='LHy6MoqSreBWl3NxKE3dQdN3';
  //secret: string='bCKND8pl_-I89v5yHuKgMa8fjy9E4FZVUPUvtDC4UMhRCq-j';
  id: string;
  secret: string;
  params:string;
  logged: boolean = false;
  leverage:number=5;
  constructor(private webClient: HTTP,private http:HttpClient,private platform:Platform) { }

ionViewWillEnter(){
  this.id='LHy6MoqSreBWl3NxKE3dQdN3';
  this.secret='bCKND8pl_-I89v5yHuKgMa8fjy9E4FZVUPUvtDC4UMhRCq-j';
}
  async getBalance() {
    let fecha = new Date();
    let balance = { walletBalance: 0, marginBalance: 0 };
    let nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.setHMACKey(this.secret, "TEXT");
    shaObj.update("GET/api/v1/user/margin?currency=XBt" + nonce.toString());
    var hmac = shaObj.getHMAC("HEX");
    let header = { 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90' };
    let url = 'https://testnet.bitmex.com/api/v1/user/margin?currency=XBt';
    try {
      let myd = await this.webClient.get(url, {}, header);
      let Datos = JSON.parse(myd.data);
      this.logged = true;
      return myd;
    } catch (error) {
      return error;
    }
  }



async setLeverage(symbol:string,leverage:number){
  let fecha = new Date();
  let balance = { walletBalance: 0, marginBalance: 0 };
  let nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
  var shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.setHMACKey(this.secret, "TEXT");
  let params2 = { 'leverage': leverage,'symbol': symbol   };
  let params = "leverage=" + leverage.toPrecision()+"&symbol=" + symbol   ;
  shaObj.update("POST/api/v1/position/leverage" + nonce.toString() + params);
  var hmac = shaObj.getHMAC("HEX");
  let header = { 'accept-charset'	:'UTF-8','content-type':'application/x-www-form-urlencoded; charset=UTF-8', 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90','user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' };
  let url = 'https://testnet.bitmex.com/api/v1/position/leverage';
  this.webClient.setSSLCertMode("nocheck");
  try {
    let myd = await this.webClient.post(url, params2, header);
    return myd;
  } 
  catch (error) {
    return error;
  }
}

async getPositions(symbol:string){
  let fecha = new Date();
  let balance = { walletBalance: 0, marginBalance: 0 };
  let nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
  var shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.setHMACKey(this.secret, "TEXT");
  let params2 = { 'symbol': symbol,'reverse':true   };
  let params = "symbol=" + symbol+"&reverse=true"   ;
  shaObj.update("GET/api/v1/position?"+params + nonce.toString() );
  var hmac = shaObj.getHMAC("HEX");
  let header = { 'accept-charset'	:'UTF-8','content-type':'application/x-www-form-urlencoded; charset=UTF-8', 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90','user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' };
  let url = 'https://testnet.bitmex.com/api/v1/position?'+params;
  try {
    let myd = await this.webClient.get(url, {}, header);
    return myd;
  } 
  catch (error) {
    return error;
  }
}

async getActiveOrders(symbol:string){
  let fecha = new Date();
  let balance = { walletBalance: 0, marginBalance: 0 };
  let nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
  var shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.setHMACKey(this.secret, "TEXT");
  let params2 = { 'symbol': symbol,'reverse':true  ,'filter':"open"};
  let params = "symbol=" + symbol+"&reverse=true"   ;
  shaObj.update("GET/api/v1/order?"+params + nonce.toString() );
  var hmac = shaObj.getHMAC("HEX");
  let header = { 'accept-charset'	:'UTF-8','content-type':'application/x-www-form-urlencoded; charset=UTF-8', 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90','user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' };
  let url = 'https://testnet.bitmex.com/api/v1/order?'+params;
  try {
    let myd = await this.webClient.get(url, {}, header);
    console.log("Tratando de mostrar");
    //console.log(JSON.stringify(myd.data));
    return myd.data;
  } 
  catch (error) {
    console.log("Hubo error en activeopior");
    return error;
  }
}



  async CreateOrder(symbol: string, type: string, side: string, price: number, quantity: number) {
    await this.setLeverage(symbol,this.leverage);
    let priceStop=price;

    let fecha = new Date();
    let balance = { walletBalance: 0, marginBalance: 0 };
    let nonce = fecha.getTime() * 100 + fecha.getMilliseconds();
    //nonce=156300766566963;
    var shaObj = new jsSHA("SHA-256", "TEXT");
    let params = "";
    //"symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type+"&stopPx="+priceStop.toString();
    let params2 = {};
    //{ 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type };

    shaObj.setHMACKey(this.secret, "TEXT");
    //console.log("Plataforma:",this.platform.platforms());
    switch (type) {
      case "Market":
        params = "symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type;
        params2['symbol']=symbol;
        params2['side']=side;
        params2['orderQty']=quantity;
        params2['ordType']=type;
        
        //params2 = { 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type,'stopPx':priceStop };
    
        if (this.platform.is("ios")){
          params2['symbol']=symbol;
          params2['side']=side;
          params2['orderQty']=quantity;
          params2['ordType']=type;
          //params2 = { 'ordType': type ,'orderQty': quantity,'side': side,'symbol': symbol ,'stopPx':priceStop  };
          params = "ordType=" + type+"&orderQty=" + quantity.toString()+ "&side=" + side +"&symbol=" + symbol  ;
        }
    
        break;
        case "Stop":
            //params2 = { 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type };
        
            if (this.platform.is("ios")){
              //params2 = { 'ordType': type ,'orderQty': quantity,'side': side,'symbol': symbol  };
              params2['symbol']=symbol;
              params2['side']=side;
              params2['orderQty']=quantity;
              params2['stopPx']=price;
              params2['ordType']=type;
        
           
              params ="ordType=" + type+"&orderQty=" + quantity.toString()+ "&side=" + side + "&stopPx="+price.toString()+"&symbol=" + symbol  ;
              //params=this.params;
            }
            else{

              params = "symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type+"&stopPx="+price.toString() ;
              params2['symbol']=symbol;
              params2['side']=side;
              params2['orderQty']=quantity;
              params2['ordType']=type;
              params2['stopPx']=price;
             
            }
        
        break;
        case "MarketIfTouched":
             //params2 = { 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type };
        
            if (this.platform.is("ios")){
              //params2 = { 'ordType': type ,'orderQty': quantity,'side': side,'symbol': symbol  };
              params2['symbol']=symbol;
              params2['side']=side;
              params2['orderQty']=quantity;
              params2['stopPx']=price;
              params2['ordType']=type;
 
              params ="ordType=" + type+"&orderQty=" + quantity.toString()+ "&side=" + side + "&stopPx="+price.toString()+"&symbol=" + symbol  ;
            }
            else{
              params = "symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type ;
              params2['symbol']=symbol;
              params2['side']=side;
              params2['orderQty']=quantity;
              params2['ordType']=type;
              params2['stopPx']=price;
             

            }
        
        break;
        case "LimitIfTouched":
            params = "symbol=" + symbol + "&side=" + side + "&orderQty=" + quantity.toString() + "&ordType=" + type+"&price="+price.toString() ;
            params2['symbol']=symbol;
            params2['side']=side;
            params2['orderQty']=quantity;
            params2['ordType']=type;
            
            params2['price']=price;
          
            //params2 = { 'symbol': symbol, 'side': side, 'orderQty': quantity, 'ordType': type };
        
            if (this.platform.is("ios")){
              //params2 = { 'ordType': type ,'orderQty': quantity,'side': side,'symbol': symbol  };
              params2['symbol']=symbol;
              params2['side']=side;
              params2['orderQty']=quantity;
              params2['ordType']=type;
              params = "ordType=" + type+"&orderQty=" + quantity.toString()+ "&side=" + side +"&symbol=" + symbol +"&price="+price.toString()  ;
            }
        
        break;
      default:
        break;
    }

  
    
    shaObj.update("POST/api/v1/order" + nonce.toString() + params);
    var hmac = shaObj.getHMAC("HEX");
    let header = { 'accept-charset'	:'UTF-8','content-type':'application/x-www-form-urlencoded; charset=UTF-8', 'api-signature': hmac, 'api-key': this.id, 'api-nonce': nonce.toString(), 'Connection': 'Keep-Alive', 'Keep-Alive': '90','user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' };
    //console.log("Serializer:", this.webClient.getDataSerializer());
    //this.webClient.setDataSerializer("json");
    //this.webClient.se
    let url = 'https://testnet.bitmex.com/api/v1/order';
    /*console.log("api-signature:",hmac);
    console.log("api-key:",this.id);
    console.log("api-nonce:",nonce);*/
    /*console.log("Params:", params);
    console.log("Params2:", JSON.stringify(params2));
    console.log("Headers:", JSON.stringify(header));
    /*console.log("Encryptado:", "POST/api/v1/order" + nonce.toString() + params)
    console.log("Secret:", this.secret);*/
    this.webClient.setSSLCertMode("nocheck");
    //this.webClient.setSSLCertMode("legacy");
    try {
      let myd = await this.webClient.post(url, params2, header);
      return myd;
    } 
    catch (error) {
      console.log("error en llamada", JSON.stringify(error));
      console.log("HD REQ:",error)
      return error;
    }
  }


  
  /*
ID:	
LHy6MoqSreBWl3NxKE3dQdN3
Secret:	
bCKND8pl_-I89v5yHuKgMa8fjy9E4FZVUPUvtDC4UMhRCq-j
*/


}
