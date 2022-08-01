const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
		createProxyMiddleware('/homeserver',{ 
			target:'http://localhost:5000',
			changeOrigin:true,
			pathRewrite:{'^/homeserver':''} 
		})
	)
}

// Proxy 세팅 이유
// 프론트는 localhost:3000에서 서버는 localhost:5000에서 개발하는데 설정을 해주지 않으면 통신 오류가 납니다.


// 기존에 사용했던 방법 - 간단 Proxy
// 단순히 리액트 프로젝트 폴더의 package.json에 다음을 추가해주면 됩니다. "proxy": "http://localhost:서버에서 사용할 포트", 
// 이제 get 요청을 한다고 할땐 '/api/원하는주소' 로 하면 됩니다.