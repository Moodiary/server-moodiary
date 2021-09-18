// 감정에 따른 음악 재생
// Author : soohyun, Last Modified : 2021.07.15

var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');

// 분노
router.get('/anger', function(req, res){
  var random = new Array('1', '2', '3', '4') // 음악 목록
  var musicName = "../music/anger_" + random[Math.floor(Math.random()*random.length)] + ".mp3" // 음악 목록 중 랜덤으로 하나를 가져와서 음악명 생성
  var filePath = path.join(__dirname, musicName) // 음악 파일 경로
  var stream = fs.createReadStream(filePath); // 파일 읽는 스트림

  // 파일 읽는 중일 때
  stream.on('data', function (data) {
    console.log('playmusic success');
    res.write(data);
  });

  // 파일 읽기가 끝났을 때
  stream.on('end', function () {
    console.log('end streaming');
    res.end();
  });

  // 파일 읽는 도중 에러 발생했을 때
  stream.on('error', function (err) {
    console.log(err);
    res.end('500 Internal Server ' + err);
  });
});

// 혐오
router.get('/aversion', function(req, res){
  var random = new Array('1', '2', '3') // 음악 목록
  var musicName = "../music/aversion_" + random[Math.floor(Math.random()*random.length)] + ".mp3" // 음악 목록 중 랜덤으로 하나를 가져와서 음악명 생성
  var filePath = path.join(__dirname, musicName) // 음악 파일 경로
  var stream = fs.createReadStream(filePath); // 파일 읽는 스트림

  // 파일 읽는 중일 때
  stream.on('data', function (data) {
    console.log('playmusic success');
    res.write(data);
  });

  // 파일 읽기가 끝났을 때
  stream.on('end', function () {
    console.log('end streaming');
    res.end();
  });

  // 파일 읽는 도중 에러 발생했을 때
  stream.on('error', function (err) {
    console.log(err);
    res.end('500 Internal Server ' + err);
  });
});

// 공포
router.get('/fear', function(req, res){
  var random = new Array('1', '2') // 음악 목록
  var musicName = "../music/fear_" + random[Math.floor(Math.random()*random.length)] + ".mp3" // 음악 목록 중 랜덤으로 하나를 가져와서 음악명 생성
  var filePath = path.join(__dirname, musicName) // 음악 파일 경로
  var stream = fs.createReadStream(filePath); // 파일 읽는 스트림

  // 파일 읽는 중일 때
  stream.on('data', function (data) {
    console.log('playmusic success');
    res.write(data);
  });

  // 파일 읽기가 끝났을 때
  stream.on('end', function () {
    console.log('end streaming');
    res.end();
  });

  // 파일 읽는 도중 에러 발생했을 때
  stream.on('error', function (err) {
    console.log(err);
    res.end('500 Internal Server ' + err);
  });
});

// 행복, 중립
router.get('/happy', function(req, res){
  var random = new Array('1', '2', '3', '4') // 음악 목록
  var musicName = "../music/happy_" + random[Math.floor(Math.random()*random.length)] + ".mp3" // 음악 목록 중 랜덤으로 하나를 가져와서 음악명 생성
  var filePath = path.join(__dirname, musicName) // 음악 파일 경로
  var stream = fs.createReadStream(filePath); // 파일 읽는 스트림

  // 파일 읽는 중일 때
  stream.on('data', function (data) {
    console.log('playmusic success');
    res.write(data);
  });

  // 파일 읽기가 끝났을 때
  stream.on('end', function () {
    console.log('end streaming');
    res.end();
  });

  // 파일 읽는 도중 에러 발생했을 때
  stream.on('error', function (err) {
    console.log(err);
    res.end('500 Internal Server ' + err);
  });
});

// 슬픔
router.get('/sad', function(req, res){
  var random = new Array('1', '2', '3', '4') // 음악 목록
  var musicName = "../music/sad_" + random[Math.floor(Math.random()*random.length)] + ".mp3" // 음악 목록 중 랜덤으로 하나를 가져와서 음악명 생성
  var filePath = path.join(__dirname, musicName) // 음악 파일 경로
  var stream = fs.createReadStream(filePath); // 파일 읽는 스트림

  // 파일 읽는 중일 때
  stream.on('data', function (data) {
    console.log('playmusic success');
    res.write(data);
  });

  // 파일 읽기가 끝났을 때
  stream.on('end', function () {
    console.log('end streaming');
    res.end();
  });

  // 파일 읽는 도중 에러 발생했을 때
  stream.on('error', function (err) {
    console.log(err);
    res.end('500 Internal Server ' + err);
  });
});

// 놀람
router.get('/surprise', function(req, res){
  var random = new Array('1', '2', '3', '4') // 음악 목록
  var musicName = "../music/surprise_" + random[Math.floor(Math.random()*random.length)] + ".mp3" // 음악 목록 중 랜덤으로 하나를 가져와서 음악명 생성
  var filePath = path.join(__dirname, musicName) // 음악 파일 경로
  var stream = fs.createReadStream(filePath); // 파일 읽는 스트림

  // 파일 읽는 중일 때
  stream.on('data', function (data) {
    console.log('playmusic success');
    res.write(data);
  });

  // 파일 읽기가 끝났을 때
  stream.on('end', function () {
    console.log('end streaming');
    res.end();
  });

  // 파일 읽는 도중 에러 발생했을 때
  stream.on('error', function (err) {
    console.log(err);
    res.end('500 Internal Server ' + err);
  });
});

module.exports = router;