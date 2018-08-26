var express = require('express');
var utility = require('utility');
var app = express();
app.get('/', (req, res) => {
  var q;
  req.query.q ? q = req.query.q : q = 'URbaby';
  var md5Vaule = utility.md5(q);
  res.send(md5Vaule)
})

app.listen(3000);