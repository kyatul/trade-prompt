import HttpService from '../services/http_service';
import Utility from '../services/utility';
import PivotPointCalculator from '../services/pivot_point_calculator';

export default class Crawler {
  constructor(instrument, instrumentToken, interval, volumeThreshold, callback){
    this.instrument = instrument;
    this.instrumentToken = instrumentToken;
    this.interval = interval;
    this.volumeThreshold = volumeThreshold;
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
    this.generateVolumeMessages();
    this.callback(this.messages);
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
    if(this.candles.length == 0) return;
    let latestVolume = this.candles[this.candles.length - 1][5];
    if(latestVolume >= this.volumeThreshold){
      this.messages.push(...[`${this.instrument} breaches volume threshold with ${latestVolume}`]);
    }
  }
}