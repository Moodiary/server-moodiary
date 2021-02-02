// 회원가입 기능 구현
// Author : Soohyun, Last Modified : 2021.02.02

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

router.post('/signup', function(req, res) {
    var user_id = req.body.user_id; // 사용자 아이디
    var user_pw = ''; // 사용자 비밀번호
    var user_name = req.body.user_name; // 사용자 이름
    var user_email = req.body.user_email; // 사용자 이메일
    var salt = ''; // 암호화에 필요한 요소
    var query = 'INSERT INTO user (user_id, user_pw, user_name, user_email, salt) VALUES (?,?,?,?,?)'; // 회원가입 쿼리문

    // 아이디 중복 확인
    connection.query('SELECT user_id FROM user WHERE user_id = ?' , user_id, function (error, result) {
        if(result.length == 0) { // 중복된 아이디가 없을 경우
            // 이메일 중복 확인
            connection.query('SELECT user_email FROM user WHERE user_email = ?' , user_email, function (error, result) {
                if(result.length == 0) { // 중복된 이메일 없을 경우
                    // 비밀번호 암호화한 후 DB에 저장
                    if(error) { // 에러 발생시
                        console.log("error ocurred: ", error);
                        res.json({"code" : 400, "result": "error ocurred"});
                    } else {
                        // salt 값 랜덤 생성
                        crypto.randomBytes(64, (err, buf) => { 
                            salt = buf.toString('base64');
                            // 비밀번호 암호화
                            crypto.pbkdf2(req.body.user_pw, salt, 100, 64, 'sha512', (err, key) => {
                                user_pw = key.toString('base64');
                                // user정보 DB에 저장
                                connection.query(query , [user_id, user_pw, user_name, user_email, salt], function (error, result) {
                                    if (error) { // 에러 발생시
                                        console.log("error ocurred: ", error);
                                        res.json({ "code" : 400, "result": "error ocurred" })
                                    } else { // 회원가입 성공시
                                        console.log("signup success");
                                        res.json({ "code": 200, "result": "signup success" });
                                    }
                                }); 
                            })
                        })
                    }
                } else { // 중복된 이메일일 경우
                    console.log("email duplicate");
                    res.json({"code" : 203, "result": "email duplicate"});
                }
            });
        } else { // 중복된 아이디일 경우
            console.log("id duplicate");
            res.json({"code" : 204, "result": "id duplicate"});
        }
    }); 
});

module.exports = router;