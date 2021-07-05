// 데이터베이스 접속 정보

var mysql = require('mysql');
require('dotenv').config();

const db_info = {
    // 로컬환경
	dev:{
		host: 'localhost',
		user: 'test',
		password: 'soohyun', //process.env.DB_SECRET
		database: 'moodiary'
    },
    // 실제 운영 서버 환경
	real: {
		host: 's',
        port: 3306,
        user: 'moodiary',
        password : process.env.DB_SECRET,
        database : 'moodiary'
	}	
};

const db_connection = {
	init : function(){
        return mysql.createConnection(db_info.dev);
	}
};

module.exports = db_connection;