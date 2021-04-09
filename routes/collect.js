// 일기 모아보기 달력
// Author : seungyeon, Last Modified : 2020.04.09

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();
let moment = require('moment');

router.post('/collect', function(req, res){
    var user_id = req.body.user_id; // 사용자 아이디
    var query = 'SELECT content, emotion, created_at FROM diary WHERE user_id = ?'

    var jArray = new Array(); // JsonArray를 위한 배열생성
    var result_json = new Object();

    // DB에서 사용자ID에 맞는 일기 내용 조회
    connection.query(query, user_id, function (error, result){
        if(error) { // 에러 발생시
            res.json({
                'code' : 404,
                'message': 'error'
            });
        }else { // 일기 내용 조회 성공시
            if (result.length == 0) { //일기 데이터가 없는 경우
                console.log("no diary");
                res.json({"code":204, "result":"no diary"});
            } else {
                for(var i=0; i<result.length; i++) {
                    var jObj = new Object(); // JsonObject를 위한 객체생성
                    var date = new Date(result[i].created_at);

                    jObj.content = result[i].content;
                    jObj.emotion = result[i].emotion;
                    jObj.created_at = moment(date).format("YYYY-MM-DD");

                    jArray.push(jObj);
                }
                result_json.arr = jArray;

                console.log("collect success");
                res.json({ "code": 200,
                "result": "collect success",
                "result_json": result_json
                });
            }    
        }
    });
});

module.exports = router;