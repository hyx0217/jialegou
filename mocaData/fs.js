const fs = require('fs');
fs.readFile('./1.txt',(err,data)=>{
    console.log(err);
    console.log(data)
})
fs.writeFile('./1.txt','123456',(err,data)=>{
    console.log(data);
})