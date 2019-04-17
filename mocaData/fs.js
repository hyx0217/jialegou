const fs = require('fs');
const axios = require('axios');

/* function bd_decrypt(arr) {
  var X_PI = Math.PI * 3000.0 / 180.0;
  for(var i=0;i<arr.length;i++){
    var x = arr[i].lng - 0.0065;
    var y = arr[i].lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    arr[i].lng=gg_lng;
    arr[i].lat=gg_lat;
    arr[i].value=arr[i].count/100
  }
  return arr
}
bd_decrypt(arr)  */

axios.get('http://192.168.1.105:9000/hotMapWeb/popular/hotMap',
{params:{
 date:'20181211',
 time:'18',
 cityCode:'330100'
}}).then(res=>{
  var result=JSON.stringify(res.data.result);
  console.log(result);
  fs.writeFile('./2.txt',`${result}`,(err,data)=>{
   console.log(data)
 }) 
 }) 