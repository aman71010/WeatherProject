
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const unit = "metric";
    const appKey = "31cca5283aef3e5850fbbd6be116b8b0";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit + "&appid=" + appKey;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.send(
                "<h3>The weather is currently " + weatherDescription +". </h3>" +
                "<h1>Temperature in " + query +  " is " + temp + " degree celcius. </h1>" +
                "<img src=" + imageUrl + ">"
            );
        })
    })
})

app.listen(3000, function(){
    console.log("server is running on port 3000.")
})

