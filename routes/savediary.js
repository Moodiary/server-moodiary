// 일기 데이터베이스에 저장
// Author : seungyeon, Last Modified : 2021.04.02

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/savediary', function(req, res){
    var user_id = req.body.user_id; //사용자 아이디
    var content = req.body.content; //일기 내용
    var emotion = req.body.emotion; //일기 감정
    var created_at = req.body.created_at; //일기 생성 날짜
    var query = 'INSERT INTO diary (user_id, content, emotion, created_at) VALUES (?,?,?,?)'; // 일기 쿼리문

    // diary정보 DB에 저장
    connection.query(query , [user_id, content, emotion, created_at], function (error, result) {
        if (error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else { // 일기 저장 성공시
            console.log("savediary success");
            res.json({ "code": 200, "result": "savediary success" });
        }
    });
});

module.exports = router;