 const express=require('express');
 const amqplib = require('amqplib');
 const routes=require('./routes');
 const {ServerConfig}=require('./config');
 const {emailService}=require('./services');

 async function consumeData(){
  try{
  //console.log("inside consume");
  const connection=await amqplib.connect(ServerConfig.amqp_url);
  const channel=await connection.createChannel();
  await channel.assertQueue('noti-queue');
  await channel.consume('noti-queue',async(data)=>{
    if(data){
   // console.log(data.content.toString());
    //console.log(Buffer.from(data.content));
    const object=JSON.parse(data.content.toString());
    //console.log(object);
    const res= await emailService.sendEmail('projectemailservice13@gmail.com',object.recipientEmail,object.subject,object.message);
   // console.log(res);
    channel.ack(data);
    }
  });


}catch(error){
  console.log(error);
  throw error;
}

  
 } 


 const app=express();
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 app.use('/api',routes);
 app.listen(ServerConfig.PORT,async()=>{
   console.log(`server is up at port no ${ServerConfig.PORT}`);
   await consumeData();
 })
