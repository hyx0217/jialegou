var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://localhost:3000"',
  /* API_ROOT:'"http://www.wangmingbao.cn:3000"', */

})
