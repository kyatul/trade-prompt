import HttpService from '../services/http_service';
import Utility from '../services/utility';
import PivotPointCalculator from '../services/pivot_point_calculator';
import CandleUtility from '../services/candle_utility';
import Candle from '../services/candle';

export default class Crawler {
  constructor(instrument, instrumentToken, interval, volumeThreshold, longCandleLength, callback){
    this.instrument = instrument;
    this.instrumentToken = instrumentToken;
    this.interval = interval;
    this.volumeThreshold = volumeThreshold;
    this.longCandleLength = longCandleLength;
    this.callback = callback;
    this.doCrawl = true;
    this.isVolumeBreached = false;
    this.candles = [];
    this.pivots = null;
    this.messages = [];
    this.calculator = new PivotPointCalculator(this.instrumentToken);
    this.pivotSlab = '';
  }

  start(){
    this.calculator.calculate().then((pivots) => {
      this.pivots = pivots;  
      setInterval(() => { if(this.doCrawl) this.crawl() }, this.interval * 60 * 100); 
    }) 
  }

  crawl(){
    this.clearStaleData();
    this.fetchData().then(() => {
      if(!this._latestCandle()) return;
      this.generateVolumeMessages();
      this.generateCandleMessages();
      this.generatePivotMessages();
      this.sendMessages();
    });
  }

  clearStaleData(){
    this.messages = [];
    this.isVolumeBreached = false;
  }

  fetchData(){
    return new Promise((resolve, reject) => {
      HttpService.get(Utility.getPublicApi(this.instrumentToken, `${this.interval}minute`, Utility.today(), Utility.today()), 
        (response) => {
          if(response.status == 'success'){
            this.candles = response.data.candles;
            resolve();
          }else{
             this.doCrawl = false;
             this.callback(response.message);
          }
        })
    })
  }

  generateVolumeMessages(){
    let latestVolume = this._latestCandle().volume;
    if(latestVolume >= this.volumeThreshold){
      this.isVolumeBreached = true;
      this.messages.push(...[`${this.instrument} breaches volume threshold with ${latestVolume}`]);
    }
  }

  generateCandleMessages(){
    let candleUtility = new CandleUtility(this._latestCandle());
    if(candleUtility.isLongCandle(this.longCandleLength)){
      this.messages.push(...[`${this.instrument} long candle formed`]);
    }
  }

  generatePivotMessages(){
    let latestPivotSlab = this.calculator.getPivotSlab(this._latestCandle().close);
    if(latestPivotSlab != this.pivotSlab){
      this.pivotSlab = latestPivotSlab;
      this.messages.push(...[`${this.instrument} closed in pivot slab ${this.pivotSlab}`]);
    }
  }

  sendMessages(){
    if(!!this.messages.length){
      this.messages.push(...[`----- ${this._latestCandle().timeStamp} ------`]); 
      this.callback(this.messages);
    }
  }

  _latestCandle(){
    if(!this.candles.length) return null;
    return new Candle(this.candles[this.candles.length - 1]);
  }
}