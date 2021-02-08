// 비밀번호 찾기 기능 구현
// Author : seungyeon, Last Modified : 2021.02.08

var express = require('express');
var router = express.Router();
var transporter = require('../config/email_config');
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/findpw', function(req, res) {
    var user_id = req.body.user_id; // 사용자 아이디
    var user_email = req.body.user_email; // 사용자 이메일

    // 사용자 아이디 여부 확인
    connection.query('select * from user where user_id = ?', user_id, function (error, result) {
        if (error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else { 
            if(result.length == 0) { // 등록된 아이디가 없는 경우
                console.log("incorrect id");
                res.json({ "code": 204, "renosult": "incorrect id" });
            } else { // 등록된 아이디가 있는 경우
                //등록된 아이디의 이메일과 입력한 이메일이 동일한지 확인
                if(user_email != result[0].user_email) { //이메일이 다른 경우
                    console.log("incorrect email");
                    res.json({ "code": 208, "result": "incorrect email" });
                }else { // 이메일이 같은 경우

                    var arr = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
                    var randomPw = createCode(arr, 10);
                    
                    //비밀번호 변경
                    result[0].user_pw = randomPw;

                    //비밀번호 랜덤 함수
                    function createCode(objArr, iLength) {
                        var arr = objArr;
                        var randomStr = "";
                        for (var j=0; j<iLength; j++) {
                            randomStr += arr[Math.floor(Math.random()*arr.length)];
                        }
                        return randomStr
                    }
    
                    // 메일 양식
                    let mail = {
                        from: 'moodiary.official@gmail.com', // 보내는 사람 이메일
                        to: user_email, // 받는 사람 이메일
                        subject: 'Moodiary의 임시비밀번호 정보입니다', // 메일 제목
                        text: '안녕하세요. Moodiary입니다.\n임시비밀번호는 ' + randomPw + '입니다.' // 메일 내용
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
        }            
    }); 
});

module.exports = router;