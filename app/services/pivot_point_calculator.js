import HttpService from '../services/http_service';
import Utility from '../services/utility';
import Candle from '../services/candle';

export default class PivotPointCalculator{
  constructor(instrumentToken) {
    this.instrumentToken = instrumentToken;
    this.candle = null;
    this.pivots = {}
    this.saveData = this.saveData.bind(this);	
    this.lastWorkingDay = (new Date('2017-07-21')).toISOString().substring(0, 10);
  }

  calculate(){
    return new Promise((resolve, reject) => {
      HttpService.get(Utility.getPublicApi(this.instrumentToken, 'day', this.lastWorkingDay, this.lastWorkingDay), 
        (response) => {
          if(response.status == 'success'){
            this.saveData(response.data.candles[0]);
            resolve(this.pivots);
          }
        });
    })
  }

  saveData(candle){
    this.candle = new Candle(candle);
    let PP = Math.round((this.candle.high + this.candle.low + this.candle.close)/3);
    this.pivots['PP'] = PP;
    this.pivots['R1'] = (2*PP - this.candle.low);
    this.pivots['S1'] = (2*PP - this.candle.high);
    this.pivots['R2'] = PP + (this.pivots.R1 - this.pivots.S1);
    this.pivots['S2'] = PP - (this.pivots.R1 - this.pivots.S1);
  }

  getPivotSlab(price){
    if(!this.candle) return '';
    if(price >= this.pivots.R2){
      return 'above R2';
    }else if(price < this.pivots.R2 && price >= this.price.R1){
      return 'in R2-R1';
    }else if(price < this.pivots.R1 && price >= this.price.PP){
      return 'in R1-PP';
    }else if(price < this.pivots.PP && price >= this.price.S1){
      return 'in PP-S1';
    }else if(price < this.pivots.S1 && price >= this.price.S2){
      return 'in S1-S2';
    }
  }
}