function checkDatetime(dateTime1,dateTime2){
    const time1=new  Date(dateTime1);
    const time2=new Date(dateTime2);
    console.log(time1);
    console.log(time2);
    console.log(time1.getTime()>time2.getTime());
    return time1.getTime()>time2.getTime();
}
module.exports={
    checkDatetime,
}