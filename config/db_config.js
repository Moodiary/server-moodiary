// 데이터베이스 접속 정보

var mysql = require('mysql');

var db_info = {
    // 로컬환경
	dev:{
		host: 'localhost',
		user: 'test',
		password: 'soohyun',
		database: 'moodiary'
    },
    // 실제 운영 서버 환경
	real:{
		host: '',
		port: '',
		user: '',
		password : '',
		database : ''
	}	
};

var db_connection = {
	init : function(){
        return mysql.createConnection(db_info.dev);
	}
};

module.exports = db_connection;