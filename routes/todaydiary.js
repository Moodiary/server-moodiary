// 오늘 일기를 썼는지 확인
// Author : soohyun, Last Modified : 2020.05.19

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/todaydiary', function(req, res){
    var user_id = req.body.user_id; // 사용자 아이디
    var query = 'SELECT emotion FROM diary WHERE user_id = ? AND created_at = CURDATE()'

    // DB에서 사용자ID에 맞는 오늘 날짜 일기 조회
    connection.query(query, user_id, function (error, result){
        if(error) { // 에러 발생시
            res.json({ 'code' : 404, 'message': 'error' });
        }else { // 
            if (result.length == 0) { //오늘 일기 데이터가 없는 경우
                console.log("no diary");
                res.json({"code":204, "result": "no diary"});
            } else {
                console.log("today diary success");
                res.json({ "code": 200, "result": "today diary success", "emotion": result[0].emotion });
            }    
        }
    });
});

module.exports = router;