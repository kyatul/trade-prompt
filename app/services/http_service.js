import http from 'axios';

let headers = {
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  }
}

export default class HttpService {

  static get(path, callback, parameters={}) {
    parameters = { params: parameters }
    let data = Object.assign(parameters, headers);
    http.get(path, data)
      .then(result => callback(result.data))
      .catch(error => callback(error.response.data));
  }

}
