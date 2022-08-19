const express=require("express");
const https=require("https");
const app=express();


app.use(express.json());
app.use(express.urlencoded());


app.get("/",(req,res)=>{

 res.sendFile(__dirname+"/index.html");
  
});

app.post("/",(req,res)=>{
  const query=req.body.cityName;
  const apiKey="5228959112793dd488f0f74b650a027d";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units=" + units;
  https.get(url,(response)=>{
     response.on("data",(data)=>{
      const weatherData =JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+ icon +"@2x.png";


      res.write("<h1>the weather is currently "+weatherDescription+"</h1>");
      res.write("<h1>the temp in "+query+" is "+temp+"</h1>");
      res.write("<img src="+imageUrl+">");
      res.send();
     });
 });

});


// const query="london";
// const apiKey="5228959112793dd488f0f74b650a027d";
// const units="metric";
// const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units=" + units;
// https.get(url,(response)=>{
//     response.on("data",(data)=>{
//      const weatherData =JSON.parse(data);
//      const temp=weatherData.main.temp;
//      const weatherDescription=weatherData.weather[0].description;
//      const icon=weatherData.weather[0].icon;
//      const imageUrl="http://openweathermap.org/img/wn/"+ icon +"@2x.png";


//      res.write(""+weatherDescription);
//      res.write(""+temp);
//      res.write("<img src='"+imageUrl+"'>");
//      res.send();
//     });
// });


app.listen("3000",()=>{
    console.log("server started");
});