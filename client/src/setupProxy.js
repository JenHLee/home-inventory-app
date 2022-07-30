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