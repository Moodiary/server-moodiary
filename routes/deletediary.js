// 일기를 데이터베이스에서 삭제
// Author : soohyun, Last Modified : 2021.05.10

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/deletediary', function(req, res){
    var user_id = req.body.user_id; //사용자 아이디
    var created_at = req.body.created_at // 일기 작성 날짜

    var query = 'DELETE FROM diary WHERE user_id = ? AND created_at = ?'; // 일기 쿼리문

    // diary정보 DB에 저장
    connection.query(query , [user_id, created_at], function (error, result) {
        if (error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else { // 일기 삭제 성공시
            console.log("deletediary success");
            res.json({ "code": 200, "result": "deletediary success" });
        }
    });
});

module.exports = router;