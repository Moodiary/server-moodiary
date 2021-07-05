// 감정에 따른 음악 재생
// Author : soohyun, Last Modified : 2021.07.05

var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/happy', function(req, res){
    var filePath =  path.join(__dirname, "../music/happy_1.mp3")
    var stream = fs.createReadStream(filePath);

    stream.on('data', function(data) {
      console.log('playmusic success');
      res.write(data);
    });

    stream.on('end', function () {
      console.log('end streaming');
      res.end();
    });

    stream.on('error', function(err) {
      console.log(err);
      res.end('500 Internal Server '+err);
    });
});

module.exports = router;