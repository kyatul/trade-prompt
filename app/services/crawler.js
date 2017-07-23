import HttpService from '../services/http_service';
import Utility from '../services/utility';
import PivotPointCalculator from '../services/pivot_point_calculator';
import CandleUtility from '../services/candle_utility';

export default class Crawler {
  constructor(instrument, instrumentToken, interval, volumeThreshold, longCandleLength, callback){
    this.instrument = instrument;
    this.instrumentToken = instrumentToken;
    this.interval = interval;
    this.volumeThreshold = volumeThreshold;
    this.longCandleLength = longCandleLength;
    this.callback = callback;
    this.doCrawl = true;
    this.candles = [];
    this.pivots = null;
    this.messages = [];
  }

  start(){
    let calculator = new PivotPointCalculator(this.instrumentToken);
    calculator.calculate().then((pivots) => {
      this.pivots = pivots;  
      setInterval(() => { if(this.doCrawl) this.crawl() }, this.interval * 60 * 1000); 
    }) 
  }

  crawl(){
    this.clearStaleData();
    this.fetchData();
    if(!this._getLastCandle()) return;
    this.generateVolumeMessages();
    if(!this.messages.length) this.callback(this.messages);
  }

  clearStaleData(){
    this.messages = [];
  }

  fetchData(){
    let api = Utility.getPublicApi(this.instrumentToken, `${this.interval}minute`, Utility.today(), Utility.today());
    HttpService.get(api, (response) => {
      if(response.status == 'success'){
        this.candles = response.data.candles;
      }else{
         this.doCrawl = false;
         this.callback(response.message);
      }
    })
  }

  generateVolumeMessages(){
    let latestVolume = this._getLastCandle()[5];
    if(latestVolume >= this.volumeThreshold){
      this.messages.push(...[`${this.instrument} breaches volume threshold with ${latestVolume}`]);
    }
  }

  generateCandleMessages(){
    let candleUtility = new CandleUtility(this._getLastCandle());
    if(candleUtility.isLongCandle(this.longCandleLength)){
      this.messages.push(...[`${this.instrument} long candle formed`]);
    }
  }

  _getLastCandle(){
    if(!this.candles.length) return null;
    return this.candles[this.candles.length - 1];
  }
}