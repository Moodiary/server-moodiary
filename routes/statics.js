// 일기 감정 통계
// Author : soohyun, Last Modified : 2021.04.07

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/statics', function(req, res){
    var user_id = req.body.user_id; //사용자 아이디
    var start = req.body.start; // 조회할 시작 날짜
    var end = req.body.end; // 조회할 끝 날짜
    var query = 'SELECT emotion,count(*) AS count FROM diary WHERE user_id = ? AND created_at BETWEEN ? AND ? GROUP BY emotion'; // 쿼리문

    var pleasure = 0; // 행복 횟수
    var sadness = 0; // 슬픔 횟수
    var surprised = 0; // 놀람 횟수
    var anger = 0; // 분노 횟수
    var fear = 0; // 공포 횟수
    var aversion = 0; // 혐오 횟수
    var neutrality = 0; // 중립 횟수

    // DB에서 일기 감정 통계 조회
    connection.query(query , [user_id, start, end], function (error, result) {
        if (error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else { // 감정 통계 조회 성공시
            if(result.length == 0) { // 일기 데이터가 없는 경우
                console.log("no diary");
                res.json({ "code": 204, "result": "no diary" });
            } else {
                for(var i=0; i<result.length; i++) {
                    console.log(result[i].count);
                    switch(result[i].emotion) {
                        case "행복":
                            pleasure = result[i].count;
                            break;
                        case "슬픔":
                            sadness = result[i].count;
                            break;
                        case "놀람":
                            surprised = result[i].count;
                            break;
                        case "분노":
                            anger = result[i].count;
                            break;
                        case "공포":
                            fear = result[i].count;
                            break;
                        case "혐오":
                            aversion = result[i].count;
                            break;
                        case "중립":
                            neutrality = result[i].count;
                            break;
                    }
                }

                console.log("statics success");
                res.json({ "code": 200, "result": "statics success", "pleasure": pleasure, "sadness": sadness, "surprised": surprised, "anger": anger, "fear": fear, "aversion": aversion, "neutrality": neutrality });
            }
        }
    });
});

module.exports = router;