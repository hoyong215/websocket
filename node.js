var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();
app.use(bodyParser());
app.use(express.static('public'));
app.use(router);

var port = process.env.PORT || 3000;

// 소켓 모듈 (XCTL 연동용)
var net = require('net');
// 웹소켓 모듈 (UI 연결용)
var WebSocketServer = require('ws').Server;


router.get("/aa", function (req, res) {
	res.send("<h1>hello heroku node.js world</h1> - " + port);
});

http.createServer(app).listen(port, function () {
	console.log('server run');
});



const WebSocket = require('ws');
const ws = new WebSocket('ws://121.134.7.206:5050');
 

console.log(new Date() + ' : Websocket Start : ');
ws.on('open', function open() {
  ws.send('something');
});






/*
var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var app = express();
app.use(bodyParser());
var router = express.Router();
app.use(express.static('public'));
app.use(router);
var https_options = {
    key:  fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    ca:   fs.readFileSync('server.crt')
};

var port = process.env.PORT || 3000;
router.get("/", function (req, res) {
	res.send("<h1>hello heroku node.js world</h1>" + https_options );
});
*/


/*

const HTTP_SERVER_PORT = 8887;
const XCTL_SERVER_IP = '121.134.7.206'
const XCTL_SERVER_PORT = '5050';

// 암호화 모듈
const crypto = require('crypto');

// 웹서버 모듈 (의존모듈들 없는것을 설치)
var https = require('https');

// 파일 시스템 모듈
var fs = require('fs');

// 인증서 파일(ca, key, cert 세가지 인자가 필요)
var https_options = {
    key:  fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
    ca:   fs.readFileSync('./server.crt')
};

//  웹서버 생성
var httpsServer = https.createServer( https_options, function(request, response) {
	console.log(new Date() + ' : nodejs page : test');
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
*/



/*
// 인증서 파일(ca, key, cert 세가지 인자가 필요)
var https_options = {
    key:  fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    ca:   fs.readFileSync('server.crt')
};

//  웹서버 생성
var httpsServer = https.createServer( https_options, function(request, response) {
	console.log(new Date() + ' : nodejs page : test');
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

// 포트설정
httpsServer.listen(HTTP_SERVER_PORT, () => {
	console.log(new Date() + ' : Server running at');
});

// 소켓 모듈 (XCTL 연동용)
var net = require('net');

// 웹소켓 모듈 (UI 연결용)
var WebSocketServer = require('ws').Server;

// 웹소켓 서버 생성
var wss = new WebSocketServer({
    server: httpsServer,
    autoAcceptConnections: false
});

// 웹소켓 연결 이벤트 등록
var indexWeb = wss.on('connection', function(ws, req) {
	console.log(new Date() + ' : Websocket Start : ');

	// 소켓 생성
	ws.xClient = new net.Socket();

	// XCTL 소켓 연결
	ws.xClient.connect(XCTL_SERVER_PORT, XCTL_SERVER_IP, function() {
		console.log(new Date() + ' : XCTL Client Connected!!');

		this.setTimeout(600);
		this.setEncoding('utf8');

		ws.xClient.on('data', function(data) {
			console.log(new Date() + ' : XCTI -> Nodejs : ' + data);
			var cmd = data.split('|')[0];
			console.log(new Date() + ' : X -> N : Command : ' + cmd );

			// 웹소켓을 사용하여 브라우저에 응답값 전송
			ws.send(data);
		});

		ws.xClient.on('close', function() {
			console.log(new Date() + ' : XCTI Client Closed!!');
		});

	});

	ws.on('message', function incoming(message) {
		console.log(new Date() + ' : UI -> Nodejs : ' + message)

		// 암호화 SHA512
		if(message.split('_')[0] == 'CLIENT') {

			var pushMap = '';

			for(var i in message.split('_')) {
				if( i == 5 ){
					pushMap += crypto.createHash('sha512').update( message.split('_')[5] ).digest('hex');
				}else{
					pushMap += message.split('_')[i] + '_';
				}
			}

			message = pushMap;
		}

		console.log(new Date() + ' : Nodejs -> XCTL : ' + message)
		ws.xClient.write(message);
	});

	ws.onclose = function(e) {
		console.log(new Date() + ' : Websocket End!!');
		ws.xClient.end();
	};

});
*/
