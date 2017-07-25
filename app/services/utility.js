export default class Utility{
  static getPublicApi(instrumentToken, period, fromDate, toDate){
    return `https://kitecharts.zerodha.com/api/chart/${instrumentToken}/${period}?public_token=youdontvalidatethis&user_id=youdontvalidatethis&api_key=youdontvalidatethis&access_token=youdontvalidatethis&from=${fromDate}&to=${toDate}&ciqrand`;
  }

  static today(){
    return Utility.formatDate('2017-07-25');
  }

  static lastWorkingDay(){
    return Utility.formatDate('2017-07-24');
  }

  static formatDate(date){
    return (new Date(date)).toISOString().substring(0, 10);
  }
}