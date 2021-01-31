//로그인
//Author : seungyeon, Last Modified : 2021.02.01

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config/db_config');
var connection = config.init();
connection.connect();
var app = express.Router();

app.use(bodyParser.json()); //json 형태로 parsing
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var user_pw = req.body.user_pw;  //사용자 비밀번호
    var query = 'select * from user where user_id = ?'; //로그인 쿼리문

    connection.query(query, user_id, function (err, result) {
        var resultCode = 404;
        var message = 'error';

        if (err) {
            console.log(err);
        } else {
            if (result.length == 0) {   //ID가 다를 경우
                resultCode = 204;
                message = 'ID or password is not correct';
            } else if (user_pw != result[0].user_pw) {     //password가 다를 경우
                resultCode = 204;
                message = 'Password is not correct';
            } else {
                resultCode = 200;   //로그인에 성공했을 경우
                message = 'log-in succeed!\nWelcome ' + result[0].user_name;
            }
        }

        res.json({
            'code': resultCode,
            'message': message
        });
    })
});