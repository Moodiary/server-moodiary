// 데이터베이스 접속 정보

var mysql = require('mysql');
require('dotenv').config();

const db_info = {
    // 로컬환경
	dev:{
		host: 'localhost',
		user: 'test',
		password: process.env.DB_SECRET, 
		database: 'moodiary'
    },
    // 실제 운영 서버 환경
	real: {
		host: 'moodiary-db.ct31r010pyis.us-east-2.rds.amazonaws.com',
        port: 3306,
        user: 'moodiary',
        password : process.env.DB_SECRET,
        database : 'moodiary'
	}	
};

const db_connection = {
	init : function(){
        return mysql.createConnection(db_info.real);
	}
};

module.exports = db_connection;