// 아이디 찾기 기능 구현
// Author : Soohyun, Last Modified : 2021.02.02

var express = require('express');
var router = express.Router();
var transporter = require('../config/email_config');
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/findid', function(req, res) {
    var user_email = req.body.user_email; // 사용자 이메일

    // 사용자 이메일 여부 확인
    connection.query('select * from user where user_email = ?' , user_email, function (error, result) {
        if (error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else { 
            if(result.length == 0) { // 등록된 이메일이 없는 경우
                console.log("incorrect email");
                res.json({ "code": 204, "result": "incorrect email" });
            } else { // 등록된 이메일이 있는 경우
                // 메일 양식
                let mail = {
                    from: 'moodiary.official@gmail.com', // 보내는 사람 이메일
                    to: user_email, // 받는 사람 이메일
                    subject: 'Moodiary의 아이디 정보입니다', // 메일 제목
                    text: '안녕하세요. Moodiary입니다.\n아이디는 ' + result[0].user_id + '입니다.' // 메일 제목
                }
                
                // 메일 전송
                transporter.sendMail(mail, function(error){
                    if (error) { // 에러 발생시
                        console.log("error ocurred: ", error);
                        res.json({"code" : 400, "result": "error ocurred"});
                    }
                    else { // 메일 전송 성공시
                        console.log("findid success");
                        res.json({ "code": 200, "result": "findid success" });
                    }
                  });
            } 
        }
    }); 
});

module.exports = router;