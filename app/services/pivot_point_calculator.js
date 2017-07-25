import HttpService from '../services/http_service';
import Utility from '../services/utility';
import Candle from '../services/candle';

export default class PivotPointCalculator{
  constructor(instrumentToken) {
    this.instrumentToken = instrumentToken;
    this.candle = null;
    this.pivots = {}
    this.saveData = this.saveData.bind(this);	
    this.lastWorkingDay = Utility.lastWorkingDay();
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
    this.pivots['R3'] = PP + (this.pivots.R2 - this.pivots.S2);
    this.pivots['S3'] = PP - (this.pivots.R2 - this.pivots.S2);
  }

  getPivotSlab(price){
    if(!this.candle) return '';
    if(price >= this.pivots.R3){
      return 'above R3';
    }else if(price < this.pivots.R3 && price >= this.pivots.R2){
      return 'in R3-R2';
    }else if(price < this.pivots.R2 && price >= this.pivots.R1){
      return 'in R2-R1';
    }else if(price < this.pivots.R1 && price >= this.pivots.PP){
      return 'in R1-PP';
    }else if(price < this.pivots.PP && price >= this.pivots.S1){
      return 'in PP-S1';
    }else if(price < this.pivots.S1 && price >= this.pivots.S2){
      return 'in S1-S2';
    }else if(price < this.pivots.S2 && price >= this.pivots.S3){
      return 'in S2-S3';
    }
  }
}