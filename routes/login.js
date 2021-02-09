//로그인 기능 구현
//Author : seungyeon, Last Modified : 2021.02.01

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

router.post('/login', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var user_pw = req.body.user_pw;  //사용자 비밀번호
    var query = 'select * from user where user_id = ?'; //로그인 쿼리문
    var salt = ''

    // 사용자 ID가 있는지 확인 -> 있으면 salt값 가져옴
    connection.query('select * from user where user_id = ?', user_id, function (err, result) {
        if(err) {
            res.json({
                'code': 404,
                'message': 'error'
            });
        } else {
            if (result.length == 0) {   //ID가 다를 경우
                resultCode = 204;
                message = 'ID or password is not correct';
                res.json({
                    'code': resultCode,
                    'message': message
                });
            } else {
                salt = result[0].salt;
                console.log("salt " + salt); 
            }
        }
    })

    connection.query(query, user_id, function (err, result) {
        var resultCode = 404;
        var message = 'error';

        if (err) {
            console.log(err);
            res.json({
                'code': resultCode,
                'message': message
            });
        } else {
            crypto.pbkdf2(user_pw, salt, 100, 64, 'sha512', (err, key) => {
                var hashPw = key.toString('base64');

                if (hashPw != result[0].user_pw) {     //password가 다를 경우
                    resultCode = 208;
                    message = 'Password is not correct';
                    res.json({
                        'code': resultCode,
                        'message': message
                    });
                } else {
                    resultCode = 200;   //로그인에 성공했을 경우
                    message = 'log-in succeed!\nWelcome ' + result[0].user_name;
                    res.json({
                        'code': resultCode,
                        'message': message
                    });
                }
            })
        }
    })
});

module.exports = router;