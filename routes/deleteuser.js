// 회원탈퇴 기능 구현
// Author : Soohyun, Last Modified : 2021.02.08

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/deleteuser', function(req, res) {
    var user_id = req.body.user_id; // 사용자 아이디

    // 아이디를 통해 사용자 데이터 삭제
    connection.query('delete from user where user_id = ?', user_id, function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else { // 회원탈퇴 성공시
            console.log("delete user success");
            res.json({ "code": 200, "result": "delete user success" });
        }
    })
});

module.exports = router;