import fetch from 'isomorphic-fetch';
import {API_PREFIX} from '@constants/outpath'
import Vue from 'vue';
import {JSBridge} from '@util';
const checkStatus = function (res) {
  switch (res.status) {
    case 401:
      throw new Error('Status:401，您无权访问');
    case 500:
      throw new Error('Status:500，服务器出错');
    case 404:
      throw new Error('Status:404，您访问的路径不存在');
    default:
      return res;
  }
};
const jsonParse = function (res) {
  return res.json();
};

let netWork = {
  post: (url, data, needLoading = true) => {
    needLoading && Vue.$vux.loading.show({text: '加载中'});
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'sid': window.android  ? JSBridge('gets_id') : ''
        // 'sid' : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXN0ZW1faW50ZXJmYWNlIiwic3lzdGVtX3RpY2tldCI6IjAzOGQxMDJhNGE2MDQ3OTNiMDhiNjI3ZDM3Y2RlM2FlIiwidXNlcl9pbmZvIjoiNWIzMDYxNWE2MWJhNGRiNmFhNDk0NjYxNGRkNGQxYjciLCJzeXN0ZW1faW50ZXJmYWNlcyI6ImludGVyZmFjZXMuNiIsImV4cCI6MTU0NzU0NTcyNCwiaWF0IjoxNTQ3NTE2OTI0fQ.9t7JGPgA_ma7ALJC7au2mfQevR8fuX3SROFj94E5VCC7VwDNSAcZ9nOR2FRzsCIRmI6UBqjRGX-ZQct5J3I19g'
      },
      body: JSON.stringify(data),
    };
    return fetch(`${API_PREFIX}${url}`, options)
      .then(checkStatus)
      .then(jsonParse)
      .then(response => {
        needLoading && Vue.$vux.loading.hide();
        return response
      })
      .catch(err => {
        needLoading && Vue.$vux.loading.hide();
        Vue.$vux.toast.show({
          text: err.message,
          type: 'warn',
          width: '50%',
          time: 2500
        })
      })
  },
  get: (url, pramsArr, needLoading = true, sid) => {
    needLoading && Vue.$vux.loading.show({text: '加载中'});
    let options = {
      method: 'GET',
      headers: {
        'sid':  window.android  ? JSBridge('gets_id') : sid
   // 'sid': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXN0ZW1faW50ZXJmYWNlIiwic3lzdGVtX3RpY2tldCI6IjAzOGQxMDJhNGE2MDQ3OTNiMDhiNjI3ZDM3Y2RlM2FlIiwidXNlcl9pbmZvIjoiZDBmNzMyYTA0YWUyNDBjYTg4NWIzZDljZjQwMWI4YTAiLCJzeXN0ZW1faW50ZXJmYWNlcyI6ImludGVyZmFjZXMuNiIsImV4cCI6MTU0NzY0OTcxOSwiaWF0IjoxNTQ3NjIwOTE5fQ.LN52hXgyW_x8gxvVPK1k4aWbW0c-l5L3xopUlQGhbHJRWscLCDb4IX0s2YxStuU6LpjG9AUB3u_jXFBNwWwnMQ'
      },
    };
    let requestData = '';
    if (pramsArr && (pramsArr instanceof Array)) {
      for (let i = 0; i < pramsArr.length; i++) {
        requestData = requestData + '/' + pramsArr[i];
      }
    }
    if (pramsArr && (pramsArr instanceof Object)) {
      requestData = '?';
      for (let i in pramsArr) {
        requestData = requestData + i + '=' + pramsArr[i] + '&';
      }
      requestData = requestData.substring(0, requestData.length - 1);
    }
    return fetch(`${API_PREFIX}${url}${requestData}`, options)
      .then(checkStatus)
      .then(jsonParse)
      .then(response => {
        needLoading && Vue.$vux.loading.hide();
        if (!response||!response.ok || response.respCode !== '0') {
          return Vue.$vux.toast.show({
            text: response.message||'服务器开小差了，请稍后再试',
            type: 'text',
            width: '60%',
            time: 3000
          })
        }
        return response
      })
      .catch(err => {
        needLoading && Vue.$vux.loading.hide();
        Vue.$vux.toast.show({
          text: err.message,
          type: 'text',
          width: '60%',
          time: 3000
        })
      })
  }
};
export default netWork
