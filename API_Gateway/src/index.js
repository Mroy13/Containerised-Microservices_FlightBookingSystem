const express=require('express');
const routes=require('./routes');
const rateLimit = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');
 const {ServerConfig}=require('./config');
const serverConfig = require('./config/server-config');
 

 const app=express();
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false,
})

 app.use(limiter);

 app.use('/flightservice', createProxyMiddleware({ target: serverConfig.flight_service, changeOrigin: true ,
 pathRewrite: {
  '^/flightservice': '/',
},
}));

 app.use('/bookingservice', createProxyMiddleware({ target: serverConfig.booking_service, changeOrigin: true ,
 pathRewrite: {
  '^/bookingservice': '/',
},
}));

 
 app.use('/api',routes);
 app.listen(ServerConfig.PORT,()=>{
   console.log(`server is up at port no ${ServerConfig.PORT}`);
   
 })
