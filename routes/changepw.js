// 비밀번호 변경 기능 구현
// Author : Soohyun, Last Modified : 2021.02.08

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

router.post('/changepw', function(req, res) {
    var user_id = req.body.user_id; // 사용자 아이디
    var before_pw = req.body.before_pw; // 기존 비밀번호
    var after_pw = req.body.after_pw; // 새로운 비밀번호
    var salt = ''

    // 아이디를 통해 salt값 가져오기
    connection.query('select * from user where user_id = ?', user_id, function (error, result) {
        if(error) {
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else {
            salt = result[0].salt;
            console.log("salt " + salt);
        }
    })

    // 기존 비밀번호가 맞는지 확인 후 -> 비밀번호 변경
    connection.query('select * from user where user_id = ?' , user_id, function (error, result) {
        if (error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else { 
            crypto.pbkdf2(before_pw, salt, 100, 64, 'sha512', (err, key) => {
                var hashPw = key.toString('base64');

                if (hashPw != result[0].user_pw) { // 기존 비밀번호가 일치하지 않는 경우
                    console.log("password is not correct");
                    res.json({ "code" : 204, "result": "password is not correct" })
                } else { // 기존 비밀번호가 일치한 경우
                    // salt 값 랜덤 생성
                    crypto.randomBytes(64, (err, buf) => { 
                        salt = buf.toString('base64');
                        // 비밀번호 암호화
                        crypto.pbkdf2(after_pw, salt, 100, 64, 'sha512', (err, key) => {
                            user_pw = key.toString('base64');
                            // 새로운 비밀번호 DB에 저장
                            connection.query('update user set user_pw = ?, salt = ? where user_id = ?' , [user_pw, salt, user_id], function (error, result) {
                                if (error) { // 에러 발생시
                                    console.log("error ocurred: ", error);
                                    res.json({ "code" : 400, "result": "error ocurred" })
                                } else { // 비밀번호 변경 성공시
                                    console.log("changepw success");
                                    res.json({ "code": 200, "result": "changepw success" });
                                }
                            }); 
                        })
                    })
                }
            })
        }
    }); 
});

module.exports = router;